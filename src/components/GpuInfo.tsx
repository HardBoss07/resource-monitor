'use client'

import React, {useEffect, useRef, useState} from "react";
import {invoke} from "@tauri-apps/api/core";

import type {GpuInfoInterface} from "@/util/interfaces/GpuInfoInterface";
import LineGraph from "@/components/LineGraph";
import {FETCH_DELAY_MS} from "@/util/consts";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export default function GpuInfo() {
    const [gpuInfo, setGpuInfo] = useState<GpuInfoInterface | null>(null);
    const [utilizationHistory, setUtilizationHistory] = useState<number[]>([]);
    const isCancelled = useRef(true);

    const fetchLoop = async () => {
        while (!isCancelled.current) {
            try {
                const data = await invoke<GpuInfoInterface>("get_gpu_data");
                setGpuInfo(data);
                setUtilizationHistory(prev => [...prev.slice(-99), data.utilization_percent]);
            } catch (err) {
                console.error("Failed to get GPU Data:", err);
                break;
            }
            await sleep(FETCH_DELAY_MS);
        }
    };

    useEffect(() => {
        isCancelled.current = false;
        fetchLoop();

        return () => {
            isCancelled.current = true;
        };
    }, []);

    if (!gpuInfo) return <div>Loading GPU Info...</div>;

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">GPU Info</h2>
            <div className="text-sm space-y-1">
                <p>Name: {gpuInfo.name}</p>
                <p>Temperature: {gpuInfo.temperature}°C</p>
                <p>VRAM Used: {gpuInfo.memory_used_mb} MB</p>
                <p>VRAM Total: {gpuInfo.memory_total_mb} MB</p>
                <p>Utilization: {gpuInfo.utilization_percent}%</p>
                <p>Fan Speed: {gpuInfo.fan_speed_percent ?? "N/A"}%</p>
            </div>
            <LineGraph
                dataPoints={utilizationHistory}
            />
        </div>
    );
}

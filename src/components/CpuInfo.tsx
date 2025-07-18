'use client'

import {useEffect, useRef, useState} from "react";
import {invoke} from "@tauri-apps/api/core";

import type {CpuInfoInterface} from "@/util/interfaces/CpuInfoInterface";
import LineGraph from "@/components/LineGraph";
import {FETCH_DELAY_MS} from "@/util/consts";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function CpuInfo() {
    const [cpuInfo, setCpuInfo] = useState<CpuInfoInterface | null>(null);
    const [usageHistory, setUsageHistory] = useState<number[]>([]);
    const isCancelled = useRef(false);

    const fetchLoop = async () => {
        while (!isCancelled.current) {
            try {
                const data = await invoke<CpuInfoInterface>("get_cpu_data");
                setCpuInfo(data);
                setUsageHistory(prev => [...prev.slice(-99), data.usage]); // keep last 100
            } catch (err) {
                console.error("Failed to fetch CPU Data:", err);
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

    if (!cpuInfo) return <div>Loading CPU info...</div>;

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">CPU Info</h2>
            <div className="text-sm space-y-1">
                <p>Current Usage: {cpuInfo.usage.toFixed(1)}%</p>
                <p>Clock Frequency (MHz): {cpuInfo.frequency}</p>
                <p>Cores: {cpuInfo.cores}</p>
            </div>
            <LineGraph dataPoints={usageHistory} label="CPU Usage:"/>
        </div>
    );
}

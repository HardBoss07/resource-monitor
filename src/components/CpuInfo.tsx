"use client";

import {useEffect, useRef, useState} from "react";
import {invoke} from "@tauri-apps/api/core";
import type {CpuInfoInterface} from "@/util/interfaces/CpuInfoInterface";
import LineGraph from "@/components/LineGraph";
import {sleep} from "@/util/sleep";

export default function CpuInfo() {
    const [cpuInfo, setCpuInfo] = useState<CpuInfoInterface | null>(null);
    const [usageHistory, setUsageHistory] = useState<number[]>([]);
    const isCancelled = useRef(false);

    const fetchLoop = async () => {
        while (!isCancelled.current) {
            try {
                const data = await invoke<CpuInfoInterface>("get_cpu_data");
                setCpuInfo(data);
                setUsageHistory((prev) => [...prev.slice(-99), data.usage]); // keep last 100
            } catch (err) {
                console.error("Failed to fetch CPU Data:", err);
                break;
            }
            await sleep();
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
        <div className="data">
            <h2>CPU Info</h2>
            <div>
                <p>Current Usage: {cpuInfo.usage.toFixed(1)}%</p>
                <p>Clock Frequency MHz: {cpuInfo.frequency}</p>
                <p>Cores: {cpuInfo.cores}</p>
            </div>
            <div className="mt-auto">
                <LineGraph
                    dataPoints={usageHistory}
                    label="CPU Usage:"
                    lineColor="text-pink-600 dark:text-fuchsia-400"
                />
            </div>
        </div>
    );
}

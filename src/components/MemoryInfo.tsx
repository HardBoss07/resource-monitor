'use client'

import {useEffect, useRef, useState} from "react";
import {invoke} from "@tauri-apps/api/core";

import type {MemoryInfoInterface} from "@/util/interfaces/MemoryInfoInterface";
import LineGraph from "@/components/LineGraph";
import {FETCH_DELAY_MS} from "@/util/consts";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function MemoryInfo() {
    const [memoryInfo, setMemoryInfo] = useState<MemoryInfoInterface | null>(null);
    const [memoryHistory, setMemoryHistory] = useState<number[]>([]);
    const isCancelled = useRef(true);

    const fetchLoop = async () => {
        while (!isCancelled.current) {
            try {
                const data = await invoke<MemoryInfoInterface>("get_memory_data");
                setMemoryInfo(data);
                setMemoryHistory(prev => [...prev.slice(-99), data.used]);
            } catch (err) {
                console.error("Failed to get Memory Data:", err);
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

    if (!memoryInfo) return <div>Loading Memory Info...</div>;

    // Calculate percentages for display
    const usedPercentage = ((memoryInfo.used / memoryInfo.total) * 100).toFixed(2); // ToFixed to 2 decimal places
    const freePercentage = ((memoryInfo.free / memoryInfo.total) * 100).toFixed(2); // ToFixed to 2 decimal places

    return (
        <div className="data">
            <h2>Memory Info</h2>
            <div>
                <p>Total Memory MB: {memoryInfo.total}</p>
                <p>Current Used Memory MB (%): {memoryInfo.used} ({usedPercentage}%)</p>
                <p>Current Free Memory MB (%): {memoryInfo.free} ({freePercentage}%)</p>
            </div>
            <div className="mt-auto">
                <LineGraph dataPoints={memoryHistory} upperRange={memoryInfo.total} label="Memory Usage (MB):"/>
            </div>
        </div>
    )
}
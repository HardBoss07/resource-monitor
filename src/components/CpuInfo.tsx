'use client'

import {useState, useEffect} from "react";
import {invoke} from "@tauri-apps/api/core";

import type {CpuInfoInterface} from "@/util/interfaces/CpuInfoInterface";

export default function CpuInfo() {
    const [cpuInfo, setCpuInfo] = useState<CpuInfoInterface | null>(null);

    useEffect(() => {
        const fetchCpuData = async () => {
            try {
                const data = await invoke<CpuInfoInterface>("get_cpu_data");
                setCpuInfo(data);
            } catch (err) {
                console.error("Failed to fetch CPU Data: ", err);
            }
        };

        fetchCpuData();
    }, []);

    if (!cpuInfo) return <div>Loading CPU info...</div>;

    return (
        <div>
            <h2>CPU Info:</h2>
            <p>Current Usage: {cpuInfo.usage}</p>
            <p>Clock Frequency: {cpuInfo.frequency}</p>
            <p>Cores: {cpuInfo.cores}</p>
        </div>
    );
}
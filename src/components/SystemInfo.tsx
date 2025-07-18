'use client'

import {useEffect, useState} from 'react';
import {invoke} from '@tauri-apps/api/core';

import type {SystemInfoInterface} from "@/util/interfaces/SystemInfoInterface";

export default function SystemInfo() {
    const [systemInfo, setSystemInfo] = useState<SystemInfoInterface | null>(null);

    useEffect(() => {
        const fetchSystemData = async () => {
            try {
                const data = await invoke<SystemInfoInterface>('get_system_data');
                setSystemInfo(data);
            } catch (err) {
                console.error('Failed to fetch system data:', err);
            }
        };

        fetchSystemData();
    }, []);

    if (!systemInfo) return <div>Loading system info...</div>;

    return (
        <div className="data">
            <h2>System Info</h2>
            <div>
                <p>System: {systemInfo.system_name}</p>
                <p>OS Version: {systemInfo.os_version}</p>
                <p>Kernel Version: {systemInfo.kernel_version}</p>
                <p>Total Memory (MB): {systemInfo.total_memory}</p>
                <p>Total CPUs: {systemInfo.total_cpus}</p>
            </div>
        </div>
    );
}

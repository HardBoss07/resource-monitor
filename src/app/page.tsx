'use client'

import SystemInfo from "@/components/SystemInfo";
import CpuInfo from "@/components/CpuInfo";
import MemoryInfo from "@/components/MemoryInfo";
import GpuInfo from "@/components/GpuInfo";

export default function Home() {
    return (
        <main>
            <h1>Resource Monitor</h1>
                <div>
                    <SystemInfo/>
                    <MemoryInfo/>
                    <CpuInfo/>
                    <GpuInfo/>
                </div>
        </main>
    );
}

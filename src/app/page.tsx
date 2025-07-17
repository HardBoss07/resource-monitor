'use client'

import SystemInfo from "@/components/SystemInfo";
import CpuInfo from "@/components/CpuInfo";
import MemoryInfo from "@/components/MemoryInfo";

export default function Home() {
    return (
        <main className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Resource Monitor</h1>
            <SystemInfo/>
            <CpuInfo/>
            <MemoryInfo/>
        </main>
    );
}

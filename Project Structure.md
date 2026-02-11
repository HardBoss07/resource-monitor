# Project Structure

```
resource-monitor/
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── CpuInfo.tsx
│   │   ├── GpuInfo.tsx
│   │   ├── LineGraph.tsx
│   │   ├── MemoryInfo.tsx
│   │   └── SystemInfo.tsx
│   └── util/
│       ├── interfaces/
│       │   ├── CpuInfoInterface.ts
│       │   ├── GpuInfoInterface.ts
│       │   ├── LineGraphInterface.ts
│       │   ├── MemoryInfoInterface.ts
│       │   └── SystemInfoInterface.ts
│       ├── consts.ts
│       └── sleep.ts
├── src-tauri/
│   ├── capabilities/
│   │   └── default.json
│   ├── gen/
│   ├── icons/
│   │   └── icon.ico
│   ├── src/
│   │   ├── monitors/
│   │   │   ├── cpu_monitor.rs
│   │   │   ├── gpu_monitor.rs
│   │   │   ├── memory_monitor.rs
│   │   │   ├── mod.rs
│   │   │   └── system_monitor.rs
│   │   ├── consts.rs
│   │   ├── data_structures.rs
│   │   ├── lib.rs
│   │   ├── main.rs
│   │   └── resource_monitor.rs
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── build.rs
│   └── tauri.conf.json
├── LICENSE
├── Project Structure.md
├── README.md
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```
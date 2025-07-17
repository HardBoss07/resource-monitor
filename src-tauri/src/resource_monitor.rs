use sysinfo::System;
use crate::data_structures::{CpuInfo, ResourceData, SystemInfo, MemoryInfo};
use crate::monitors::cpu_monitor::CpuMonitor;
use crate::monitors::system_monitor::SystemMonitor;
use crate::monitors::memory_monitor::MemoryMonitor;

pub struct ResourceMonitor {
    sys: System,
}

impl ResourceMonitor {
    pub fn new() -> Self {
        ResourceMonitor{
            sys: System::new_all(),
        }
    }

    pub fn collect_all_data(&mut self) -> ResourceData {
        self.sys.refresh_all();

        let cpu_info = CpuMonitor::get_cpu_info(&mut self.sys);
        let system_info = SystemMonitor::get_system_info(&mut self.sys);
        let memory_info = MemoryMonitor::get_memory_info(&mut self.sys);

        ResourceData {
            cpu: cpu_info,
            sys: system_info,
            mem: memory_info,
            timestamp_ms: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap_or_default()
                .as_millis() as u64,
        }
    }

    pub fn collect_cpu_data(&mut self) -> CpuInfo {
        CpuMonitor::get_cpu_info(&mut self.sys)
    }

    pub fn collect_system_data(&mut self) -> SystemInfo {
        SystemMonitor::get_system_info(&mut self.sys)
    }

    pub fn collect_memory_data(&mut self) -> MemoryInfo {
        MemoryMonitor::get_memory_info(&mut self.sys)
    }
}
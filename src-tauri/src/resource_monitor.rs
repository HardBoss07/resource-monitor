use sysinfo::System;
use crate::data_structures::ResourceData;
use crate::monitors::cpu_monitor::CpuMonitor;
use crate::monitors::system_monitor::SystemMonitor;

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

        ResourceData {
            cpu: cpu_info,
            sys: system_info,
            timestamp_ms: std::time::SystemTime::now()
                .duration_since(std::time::UNIX_EPOCH)
                .unwrap_or_default()
                .as_millis() as u64,
        }
    }
}
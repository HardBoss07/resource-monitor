use crate::data_structures::SystemInfo;
use sysinfo::System;

#[derive(Debug)]
pub struct SystemMonitor;

impl SystemMonitor {
    pub fn get_system_info(sys: &mut System) -> SystemInfo {
        sys.refresh_all();

        let system_name = System::name().unwrap_or("Unknown".to_string());
        let os_version = System::os_version().unwrap_or("Unknown".to_string());
        let kernel_version = System::kernel_version().unwrap_or("Unknown".to_string());
        let total_memory = sys.total_memory() / 0x100000; // Convert to MB
        let total_cpus = sys.cpus().len();

        SystemInfo {
            system_name,
            os_version,
            kernel_version,
            total_memory,
            total_cpus,
        }
    }
}

use crate::data_structures::CpuInfo;
use sysinfo::System;
use systemstat::{System as StatSystem, Platform};

#[derive(Debug)]
pub struct CpuMonitor;

impl CpuMonitor {
    pub fn get_cpu_info(sys: &mut System) -> CpuInfo {
        sys.refresh_cpu();

        let global_cpu = sys.global_cpu_info();
        let num_cores = sys.cpus().len();

        let temperature = Self::get_temperature(sys);

        CpuInfo {
            name: global_cpu.name().to_string(),
            usage: global_cpu.cpu_usage(),
            frequency: sys.cpus()[0].frequency(),
            cores: num_cores,
            temperature,
        }
    }

    fn get_temperature(_sys: &System) -> Option<f32> {
        // --- WINDOWS IMPLEMENTATION ---
        #[cfg(target_os = "windows")]
        {
            let sys_stat = StatSystem::new();
            match sys_stat.cpu_temp() {
                Ok(temp) => Some(temp),
                Err(_) => None,
            }
        }

        // --- LINUX IMPLEMENTATION ---
        #[cfg(target_os = "linux")]
        {
            let mut components = Components::new_with_refreshed_list();
            components
                .iter()
                .find(|c| {
                    let label = c.label().to_lowercase();
                    label.contains("cpu") || label.contains("package") || label.contains("core")
                })
                .map(|c| c.temperature())
        }

        // --- FALLBACK ---
        #[cfg(not(any(target_os = "windows", target_os = "linux")))]
        {
            None
        }
    }
}

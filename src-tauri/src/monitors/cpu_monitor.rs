use sysinfo::{Cpu, System};
use crate::data_structures::CpuInfo;

#[derive(Debug)]
pub struct CpuMonitor;

impl CpuMonitor {
    pub fn get_cpu_info(sys: &mut System) -> CpuInfo {
        sys.refresh_cpu();

        let global_cpu = sys.global_cpu_info();
        let num_cores = sys.cpus().len();

        CpuInfo {
            name: global_cpu.name().to_string(),
            usage: global_cpu.cpu_usage(),
            frequency: global_cpu.frequency(),
            cores: num_cores,
        }
    }
}
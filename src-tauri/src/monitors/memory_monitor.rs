use sysinfo::System;
use crate::data_structures::MemoryInfo;

#[derive(Debug)]
pub struct MemoryMonitor;

impl MemoryMonitor {
    pub fn get_memory_info(sys: &mut System) -> MemoryInfo {
        sys.refresh_memory();

        MemoryInfo {
            total: sys.total_memory(),
            used: sys.total_memory() - sys.free_memory(),
            free: sys.free_memory(),
        }
    }
}
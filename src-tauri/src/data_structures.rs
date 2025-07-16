use serde::{Deserialize, Serialize};

// Represents CPU information
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CpuInfo {
    pub name: String,
    pub usage: f32, 
    pub frequency: u64,
    pub cores: usize,
}

// Represents the overall resource data to be sent to the frontend
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ResourceData {
    pub cpu: CpuInfo,
    pub sys: SystemInfo, 
    pub timestamp_ms: u64,
}

// Represents system information
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SystemInfo {
    pub system_name: String,
    pub os_version: String,
    pub kernel_version: String,
    pub total_memory: u64,
    pub total_cpus: usize,
}
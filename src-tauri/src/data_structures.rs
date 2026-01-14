use serde::{Deserialize, Serialize};

// Represents the overall resource data to be sent to the frontend
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ResourceData {
    pub cpu: CpuInfo,
    pub sys: SystemInfo,
    pub mem: MemoryInfo,
    pub gpu: GpuInfo,
    pub timestamp_ms: u64,
}

// Represents CPU information
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CpuInfo {
    pub name: String,
    pub usage: f32,
    pub frequency: u64,
    pub cores: usize,
    pub temperature: Option<f32>,
}

// Represents the GPU information
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GpuInfo {
    pub name: String,
    pub temperature: u32,
    pub memory_used_mb: u64,
    pub memory_total_mb: u64,
    pub utilization_percent: u32,
    pub fan_speed_percent: Option<u32>,
}

// Represents memory information
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MemoryInfo {
    pub total: u64,
    pub used: u64,
    pub free: u64,
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

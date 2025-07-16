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
    pub timestamp_ms: u64,
}
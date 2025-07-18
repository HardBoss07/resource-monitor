use nvml_wrapper::Nvml;
use nvml_wrapper::enum_wrappers::device::TemperatureSensor;
use crate::data_structures::GpuInfo;

#[derive(Debug)]
pub struct GpuMonitor;

impl GpuMonitor {
    pub fn get_gpu_info() -> Result<GpuInfo, String> {
        let nvml = Nvml::init().map_err(|e| format!("Failed to init NVML: {}", e))?;

        let device = nvml.device_by_index(0).map_err(|e| format!("Failed to get device: {}", e))?;

        let name = device.name().map_err(|e| e.to_string())?;

        let temperature = device
            .temperature(TemperatureSensor::Gpu)
            .map_err(|e| e.to_string())?;

        let memory = device.memory_info().map_err(|e| e.to_string())?;

        let utilization = device.utilization_rates().map_err(|e| e.to_string())?;

        let fan_speed: u32 = device.fan_speed(0).ok().expect("Failed to get fan speed");

        Ok(GpuInfo {
            name,
            temperature,
            memory_used_mb: memory.used / 0x100000, // Convert to MB
            memory_total_mb: memory.total / 0x100000, // Convert to MB
            utilization_percent: utilization.gpu,
            fan_speed_percent: Some(fan_speed),
        })
    }
}
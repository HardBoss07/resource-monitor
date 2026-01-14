use crate::consts::MB;
use crate::data_structures::GpuInfo;
use nvml_wrapper::enum_wrappers::device::TemperatureSensor;
use nvml_wrapper::Nvml;

#[derive(Debug)]
pub struct GpuMonitor;

impl GpuMonitor {
    pub fn get_gpu_info(nvml: &Nvml) -> Result<GpuInfo, String> {
        let device = nvml
            .device_by_index(0)
            .map_err(|e| format!("Failed to get device: {}", e))?;

        let name = device.name().map_err(|e| e.to_string())?;
        let temperature = device
            .temperature(TemperatureSensor::Gpu)
            .map_err(|e| e.to_string())?;
        let memory = device.memory_info().map_err(|e| e.to_string())?;
        let utilization = device.utilization_rates().map_err(|e| e.to_string())?;

        // Fan speed requires fan index, use 0, if fails, return None
        let fan_speed = match device.fan_speed(0) {
            Ok(speed) => Some(speed),
            Err(_) => None,
        };

        Ok(GpuInfo {
            name,
            temperature,
            memory_used_mb: memory.used / MB,
            memory_total_mb: memory.total / MB,
            utilization_percent: utilization.gpu,
            fan_speed_percent: fan_speed,
        })
    }
}

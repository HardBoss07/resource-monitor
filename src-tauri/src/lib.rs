mod consts;
mod data_structures;
mod monitors;
mod resource_monitor;

use data_structures::{CpuInfo, GpuInfo, MemoryInfo, ResourceData, SystemInfo};
use resource_monitor::ResourceMonitor;
use std::sync::Mutex;
use tauri::State;

type SharedResourceMonitor = Mutex<ResourceMonitor>;

#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[tauri::command]
fn greet(name: &str) -> String {
    println!("Received greet command with name: {}", name);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_all_resource_data(monitor: State<SharedResourceMonitor>) -> ResourceData {
    let mut monitor = monitor.lock().expect("Failed to lock ResourceMonitor");
    monitor.collect_all_data()
}

#[tauri::command]
fn get_cpu_data(monitor: State<SharedResourceMonitor>) -> CpuInfo {
    let mut monitor = monitor.lock().expect("Failed to lock ResourceMonitor");
    monitor.collect_cpu_data()
}

#[tauri::command]
fn get_system_data(monitor: State<SharedResourceMonitor>) -> SystemInfo {
    let mut monitor = monitor.lock().expect("Failed to lock ResourceMonitor");
    monitor.collect_system_data()
}

#[tauri::command]
fn get_memory_data(monitor: State<SharedResourceMonitor>) -> MemoryInfo {
    let mut monitor = monitor.lock().expect("Failed to lock ResourceMonitor");
    monitor.collect_memory_data()
}

#[tauri::command]
fn get_gpu_data(monitor: State<SharedResourceMonitor>) -> GpuInfo {
    let monitor = monitor.lock().expect("Failed to lock ResourceMonitor");
    monitor.collect_gpu_data()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let monitor = ResourceMonitor::new().expect("Failed to initialize Resource Monitor");

    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .manage(Mutex::new(monitor))
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            get_all_resource_data,
            get_cpu_data,
            get_system_data,
            get_memory_data,
            get_gpu_data
        ])
        .run(tauri::generate_context!())
        .expect("Failed to run Resource Monitor");
}

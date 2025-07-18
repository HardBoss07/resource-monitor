// src-tauri/src/lib.rs
mod data_structures;
mod monitors;
mod resource_monitor;

use resource_monitor::ResourceMonitor;
use data_structures::{ResourceData, CpuInfo, SystemInfo, MemoryInfo, GpuInfo};

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// Define your Tauri commands here
#[tauri::command]
fn greet(name: &str) -> String {
    println!("Received greet command with name: {}", name);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_all_resource_data() -> ResourceData {
  let mut monitor = ResourceMonitor::new();
  monitor.collect_all_data()
}

#[tauri::command]
fn get_cpu_data() -> CpuInfo {
  let mut monitor = ResourceMonitor::new();
  monitor.collect_cpu_data()
}

#[tauri::command]
fn get_system_data() -> SystemInfo {
  let mut monitor = ResourceMonitor::new();
  monitor.collect_system_data()
}

#[tauri::command]
fn get_memory_data() -> MemoryInfo {
  let mut monitor = ResourceMonitor::new();
  monitor.collect_memory_data()
}

#[tauri::command]
fn get_gpu_data() -> GpuInfo {
  let mut monitor = ResourceMonitor::new();
  monitor.collect_gpu_data()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
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
        // Register your commands here
        .invoke_handler(tauri::generate_handler![greet, get_all_resource_data, get_cpu_data, get_system_data, get_memory_data, get_gpu_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
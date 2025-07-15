// src-tauri/src/lib.rs

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// Define your Tauri commands here
#[tauri::command]
fn greet(name: &str) -> String {
    println!("Received greet command with name: {}", name);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_system_info() -> String {
    let os_info = os_info::get(); // Make sure os_info is in your Cargo.toml
    let os_type = os_info.os_type();
    let version = os_info.version();
    let bitness = os_info.bitness();

    format!(
        "OS: {:?}, Version: {}, Bitness: {:?}",
        os_type, version, bitness
    )
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
        .invoke_handler(tauri::generate_handler![greet, get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
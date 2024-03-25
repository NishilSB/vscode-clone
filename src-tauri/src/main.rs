extern crate walkdir;
use std::{
    env, fs,
    path::{Path, PathBuf},
};

use walkdir::WalkDir;
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn get_files_and_folders() -> Vec<PathBuf> {
    // let dir_path: &str = "/path/to/your/directory";
    let path_buf_result: PathBuf = env::current_dir().unwrap();
    let path_string: std::borrow::Cow<'_, str> = path_buf_result.to_string_lossy();
    println!("Directory found {}", path_string);
    let mut files: Vec<PathBuf> = Vec::new();

    // Recursively walk through the directory and its subdirectories
    for entry in WalkDir::new(path_buf_result) {
        match entry {
            Ok(entry) => {
                // if entry.file_type().is_file() {
                // Print the file path
                // let abs_path = get_absalute_path(entry.path());
                // println!("{}", abs_path.display());
                files.push(entry.into_path());
                // }
            }
            Err(err) => eprintln!("Error: {}", err),
        }
    }

    return files;
}

// fn get_absalute_path(temp_path: &Path) -> PathBuf {
//     // let path = env::current_dir().unwrap();
//     fs::canonicalize(&temp_path).unwrap()
//     // println!("{}", absolute_path.display());
// }

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_files_and_folders])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

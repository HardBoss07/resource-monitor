# Resource Monitor

A lightweight and efficient desktop application for monitoring your system's resource usage, with a focus on CPU and NVIDIA GPU performance. Built with Tauri and Next.js, Resource Monitor offers a native and responsive experience.

## ✨ Features

* **Real-time CPU Monitoring:** Get live insights into your processor's activity and usage.

* **NVIDIA GPU Monitoring:** Access detailed performance metrics and usage statistics for your NVIDIA graphics card.

* **Lightweight & Native:** Enjoy a minimal footprint and optimal performance thanks to its Tauri-based architecture.

* **Cross-Platform (Future):** Currently focused on Windows, with plans for broader platform support.

## 💻 Compatibility

### Supported Operating Systems:

* **Windows**

### Hardware Compatibility:

* **CPUs:** Tested on AMD CPUs, and Intel CPUs are expected to be fully supported, leveraging the `sysinfo` Rust library for accurate data.

* **GPUs:** Specifically designed to support **NVIDIA GPUs** through the `nvml-wrapper` library.

## ⬇️ Installation

You can easily install Resource Monitor on your Windows system using one of the provided installers.

1.  Go to the [Releases page](https://github.com/HardBoss07/resource-monitor/releases/tag/v0.1.0) of this repository.

2.  Download your preferred installer from the **Assets** section of the latest release:

    * **`.msi` (Microsoft Installer):** The recommended standard Windows installer for a guided installation.

    * **`.exe` (NSIS Installer):** An alternative executable installer.

3.  **Run the Installer:**

    * **For `.msi`:** Double-click the `.msi` file and follow the on-screen prompts.

    * **For `.exe` (NSIS):** Double-click the `.exe` file and proceed through the installation wizard.

4.  **Launch:** After installation, you can launch "Resource Monitor" from your Start Menu or desktop shortcut.

## 🚀 Getting Started (For Users)

Once installed, simply launch the application. The main window will display real-time data for your CPU and NVIDIA GPU.

## 🛠️ Building from Source (For Developers)

If you wish to build Resource Monitor from its source code, follow these steps:

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS recommended)

* [Rust](https://www.rust-lang.org/tools/install) (with `rustup`)

* [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites) (installed via npm)

* For Windows builds, ensure you have the necessary build tools (e.g., Visual Studio Build Tools).

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/HardBoss07/resource-monitor.git
    cd resource-monitor
    ```

2.  **Install Node.js dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Next.js for Static Export:**
    Ensure your `next.config.js` file at the project root includes:

    ```javascript
    // next.config.js
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'export', // This enables static HTML export
      images: {
        unoptimized: true, // Crucial if you use Next.js Image component with static export
      },
      // ... other configurations
    };
    module.exports = nextConfig;
    ```

    *Note: With `output: 'export'` configured in `next.config.js`, `next build` will automatically generate the static assets into the `out/` directory.*

4.  **Configure Tauri:**
    Ensure your `src-tauri/tauri.conf.json` file includes:

    ```json
    // src-tauri/tauri.conf.json
    {
      // ...
      "build": {
        "beforeDevCommand": "npm run dev",
        "beforeBuildCommand": "npm run build", // `next export` is handled by next.config.js
        "devUrl": "http://localhost:3000",
        "frontendDist": "../out" // Points to Next.js static export output
      },
      // ...
    }
    ```

    And your `package.json` build script:

    ```json
    // package.json
    "scripts": {
      "build": "next build", // `next export` is handled by next.config.js
      "tauri": "tauri",
      // ...
    },
    ```

### Running in Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run tauri dev
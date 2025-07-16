'use client';

import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import SystemInfo from "@/components/SystemInfo"; // Import invoke from Tauri API

export default function Home() {
  const [resourceData, setResourceData] = useState<any>(null); // State to hold resource data

  useEffect(() => {
    // Function to fetch resource data from the Rust backend
    const fetchResourceData = async () => {
      try {
        const data = await invoke('get_all_resource_data');
        setResourceData(data);
      } catch (err) {
        console.error('Error fetching resource data:', err);
      }
    };

    fetchResourceData();
  }, []);

  return (
    <>
      <h1>Resource Monitor</h1>
      <div>
        {resourceData && (
          <div>
            <h2>Resource Data</h2>
            <pre>{JSON.stringify(resourceData, null, 2)}</pre>
          </div>
        )}
      </div>
      <SystemInfo />
    </>
  );
}
'use client';

import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core'; // Import invoke from Tauri API

export default function Home() {
  const [greetingMessage, setGreetingMessage] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('Tauri User');

  // Function to call the 'greet' command
  const sendGreeting = async () => {
    try {
      // Call the Rust command 'greet' with the 'nameInput' as an argument
      const message = await invoke('greet', { name: nameInput });
      setGreetingMessage(message as string); // Cast to string as invoke returns unknown
    } catch (err) {
      console.error('Error invoking greet:', err);
      setGreetingMessage(`Error: Failed to greet.`); // Simple error message
    }
  };

  return (
    <>
      <h1>Test</h1>
      <div>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={sendGreeting}>
          Greet from Frontend
        </button>
        {greetingMessage && (
          <p>{greetingMessage}</p>
        )}
      </div>
    </>
  );
}
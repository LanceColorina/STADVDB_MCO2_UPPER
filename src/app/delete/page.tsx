"use client"
import { useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  // Handler for form submission
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the URL with query parameters
    const queryParams = new URLSearchParams({
      id,
      db: 'master' // You can change this to 'lower' or 'upper' depending on the database
    });

    try {
      // Send the request to the API
      const response = await fetch(`/api/endpoint?${queryParams.toString()}`, {
        method: 'GET',
      });

      const data = await response.json();
      if (data.error) {
        setMessage(`Error: ${data.error}`);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4 text-black">Delete a Game</h1>
      
      <form onSubmit={handleDelete} className="grid gap-4 max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col">
          <label htmlFor="id" className="text-black font-medium">Game ID</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 text-white py-2 rounded hover:bg-red-700"
        >
          Delete Game
        </button>
      </form>

      {message && <p className="mt-4 text-lg font-medium">{message}</p>}
    </div>
  );
}

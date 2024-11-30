"use client"
import { useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the URL with query parameters
    const queryParams = new URLSearchParams({
      id,
      name,
      date,
      price,
      image,
      db: 'master' // Use 'master' or another database type
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
      <h1 className="text-black text-2xl font-semibold mb-4">Add a New Game</h1>
      
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
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

        <div className="flex flex-col">
          <label htmlFor="name" className="text-black font-medium">Game Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-black font-medium">Release Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="text-black font-medium">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-black font-medium">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Game
        </button>
      </form>

      {message && <p className="mt-4 text-lg font-medium">{message}</p>}
    </div>
  );
}

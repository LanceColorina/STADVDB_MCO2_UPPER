"use client";
import { useState , useEffect } from "react";

export default function Home() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");


  // States for checkboxes
  const [master, setMaster] = useState(true);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    setMaster(true);
    setLower(true);
    setUpper(true);
  }, []);

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
      const response = await fetch(`/api/add?${queryParams.toString()}`);
      if (response.ok) {
        setResponseMessage("Game added successfully!");
      } else {
        setResponseMessage("Failed to add the game. Please try again.");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <h1 className="text-black text-2xl font-semibold mb-1">Add a New Game</h1>

      <form onSubmit={handleSubmit} className="grid text-black gap-4 max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col">
          <label htmlFor="id" className="text-black font-medium">
            Game ID
          </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border border-black p-2 rounded text-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="text-black font-medium">
            Game Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-black font-medium">
            Release Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="text-black font-medium">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-black font-medium">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black"
            required
          />
        </div>

        <div className="flex flex-row mt-4 ">
          <label className="text-black font-medium mb-2 mr-4">Select Databases:</label>

          <label className="flex items-center gap-2 text-black mr-4">
            <input
              type="checkbox"
              checked={master}
              onChange={(e) => setMaster(e.target.checked)}
              className="w-4 h-4 "
            />
            Master
          </label>

          <label className="flex items-center gap-2 text-black mr-4">
            <input
              type="checkbox"
              checked={lower}
              onChange={(e) => setLower(e.target.checked)}
              className="w-4 h-4"
            />
            Lower
          </label>

          <label className="flex items-center gap-2 text-black">
            <input
              type="checkbox"
              checked={upper}
              onChange={(e) => setUpper(e.target.checked)}
              className="w-4 h-4"
            />
            Upper
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Game
        </button>
      </form>
      {responseMessage && (
        <div
          className={`text-center mt-4 p-3 rounded ${
            responseMessage.includes("successfully")
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {responseMessage}
        </div>
      )}
    </div>
  );
}

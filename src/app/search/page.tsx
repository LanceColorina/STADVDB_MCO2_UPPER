"use client"
import { useState } from "react";
interface Game {
  app_id: number;
  game_name: string;
  header_image: string;
  release_date: string;
  price: number;
  negative:number;
  positive: number;
}

const GameSearchPage = () => {
  const [gameName, setGameName] = useState<string>(""); // State to store the game name input
  const [gameData, setGameData] = useState<Game>(); // State to store fetched game data
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State to handle errors

  // Function to fetch game data based on the game name
  const fetchGameData = async (name: string) => {
    if (!name) {
      setError("Please enter a game name.");
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous error
    const databases = ["master", "lower", "upper"];
    const selectedDb = databases[Math.floor(Math.random() * databases.length)];

    try {
      const response = await fetch(`/api/search?db=${selectedDb}&name=${name}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError("Game not found.");
      } else {
        setGameData(data[0]);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGameData(gameName);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-4 text-black">Search for a Game </h1>

      <form onSubmit={handleSearch} className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          placeholder="Enter Game ID"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {gameData && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold">{gameData.game_name}</h2>
          <p><strong>Release Date:</strong> {gameData.release_date}</p>
          <p><strong>Price:</strong> ${gameData.price}</p>
          <img
            src={gameData.header_image}
            alt={gameData.game_name}
            className="w-full h-48 object-cover mt-4 rounded-md"
          />
          <div className="mt-4">
            <h3 className="text-lg font-semibold">User Reviews</h3>
            <p><strong>Positive:</strong> {gameData.positive}</p>
            <p><strong>Negative:</strong> {gameData.negative}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSearchPage;


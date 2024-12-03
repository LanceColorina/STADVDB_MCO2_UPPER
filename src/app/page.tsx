import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">Game Manager</h1>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <Link href="/edit" passHref>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Edit Game
          </button>
        </Link>
        <Link href="/delete" passHref>
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete Game
          </button>
        </Link>
        <Link href="/search" passHref>
          <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Find Game
          </button>
        </Link>
      </div>
    </div>
  );
}

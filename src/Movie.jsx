import { useState } from "react";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY; // Load API key from .env

const Movie = () => {
  const [query, setQuery] = useState(""); // Search input state
  const [movies, setMovies] = useState([]); // Movie results state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message state

  // Function to search movies
  const searchMovies = async () => {
    if (!query.trim()) return; // Prevent empty searches
    setLoading(true);
    setError(null);

    const API_URL = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`; // Correct API call

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      console.log("API Response:", data); // Debugging log

      if (data.Response === "True" && Array.isArray(data.Search)) {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found.");
        setMovies([]); // Clear movies on error
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Movie Search</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="p-2 rounded-l bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
          onClick={searchMovies}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="bg-gray-800 p-4 rounded">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-64 object-cover" />
              <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
              <p className="text-sm text-gray-400">{movie.Year}</p>
            </div>
          ))
        ) : (
          !loading && !error && <p className="text-center">No movies to display.</p>
        )}
      </div>
    </div>
  );
};

export default Movie;

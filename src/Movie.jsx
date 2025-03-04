import { useState } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; 
const Movie = () => {
  const [query, setQuery] = useState(""); 
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  
  const searchMovies = async () => {
    if (!query.trim()) return; 
    setLoading(true);
    setError(null);

    const API_URL = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`; // Correct API call

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      console.log("API Response:", data); 

      if (data.Response === "True" && Array.isArray(data.Search)) {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found.");
        setMovies([]); 
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white p-4">
      <h1 className="text-6xl font-bold text-center mb-8">Movie Search</h1>

      <div className="flex justify-center mb-4 gap-10">
        <input
          type="text"
          className="p-2 rounded-lg bg-gray-800 border border-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={searchMovies}
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4  shadow-xl rounded-2xl">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="bg-gray-800 p-4 rounded-2xl">
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

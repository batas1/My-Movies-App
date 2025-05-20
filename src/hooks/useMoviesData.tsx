import { useState, useEffect } from 'react';
import api from '@/services/api';
import { IMovieDetail } from '@/types/movie';

export const useMoviesData = () => {
  const [trendingMovies, setTrendingMovies] = useState<IMovieDetail[]>([]);
  const [animationMovies, setAnimationMovies] = useState<IMovieDetail[]>([]);
  const [scienceFictionMovies, setScienceFictionMovies] = useState<IMovieDetail[]>([]);
  const [documentaries, setDocumentaries] = useState<IMovieDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      
      // Trending movies (using day as default)
      const trendingResponse = await api.get(`/trending/movie/day`, {
        params: {
          language: "en-US",
          page: 1
        }
      });
      
      // Animation movies
      const animationResponse = await api.get('/discover/movie', {
        params: {
          language: "en-US",
          with_genres: 16, // Animation genre ID
          sort_by: "vote_count.desc",
          page: 1
        }
      });
      
      // Science Fiction movies
      const scifiResponse = await api.get('/discover/movie', {
        params: {
          language: "en-US",
          with_genres: 878, // Science Fiction genre ID
          sort_by: "vote_count.desc",
          page: 1
        }
      });
      
      // Documentary movies
      const documentaryResponse = await api.get('/discover/movie', {
        params: {
          language: "en-US",
          with_genres: 99, // Documentary genre ID
          sort_by: "vote_count.desc",
          page: 1
        }
      });
      
      setTrendingMovies(trendingResponse.data.results.slice(0, 8));
      setAnimationMovies(animationResponse.data.results.slice(0, 8));
      setScienceFictionMovies(scifiResponse.data.results.slice(0, 8));
      setDocumentaries(documentaryResponse.data.results.slice(0, 8));
      
      setError(null);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError("Could not load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    
    // Auto-update movies once per day
    const intervalId = setInterval(() => {
      fetchMovies();
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return () => clearInterval(intervalId);
  }, []);

  return {
    trendingMovies,
    animationMovies,
    scienceFictionMovies,
    documentaries,
    loading,
    error
  };
};
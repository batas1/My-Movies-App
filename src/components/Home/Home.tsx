'use client'
import React from "react";
import { TrendingUp, Film, Video, Rocket, Camera } from "lucide-react";
import { useMoviesData } from "@/hooks/useMoviesData";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import RandomMovieButton from "../RandomMovieButton/RandomMovieButton";

const Home = () => {
  const { 
    trendingMovies, 
    animationMovies, 
    scienceFictionMovies, 
    documentaries,
    loading, 
    error
  } = useMoviesData();

  // Combine all movies for the random selection
  const allMovies = [
    ...(trendingMovies || []),
    ...(animationMovies || []),
    ...(scienceFictionMovies || []),
    ...(documentaries || [])
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse flex space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-8 p-4 bg-gray-50 border-l-4 border-red-500 rounded shadow-sm">
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with featured movie */}
      {trendingMovies.length > 0 && (
        <div className="relative h-96 mb-12">
          <div className="absolute inset-0">
            {trendingMovies[0].backdrop_path && (
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/original'}${trendingMovies[0].backdrop_path}`}
                alt={trendingMovies[0].title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
            <h1 className="text-4xl font-bold text-white mb-2">{trendingMovies[0].title}</h1>
            <p className="text-gray-200 max-w-2xl mb-6 line-clamp-2">{trendingMovies[0].overview}</p>
            <a 
              href={`/movie/${trendingMovies[0].id}`}
              className="inline-flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 w-max"
            >
              View Details
            </a>
          </div>
        </div>
      )}
      
      {/* Random Movie Button */}
      <RandomMovieButton movies={allMovies} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content sections with movie carousels */}
        <div className="space-y-20">
          <MovieCarousel 
            title="Trending Now" 
            movies={trendingMovies}
            icon={<TrendingUp className="text-indigo-500" size={24} />}
          />
          
          <MovieCarousel 
            title="Animation Films" 
            movies={animationMovies}
            icon={<Video className="text-blue-500" size={24} />}
          />
          
          <MovieCarousel 
            title="Science Fiction" 
            movies={scienceFictionMovies}
            icon={<Rocket className="text-purple-500" size={24} />}
          />
          
          <MovieCarousel 
            title="Documentaries" 
            movies={documentaries}
            icon={<Camera className="text-green-500" size={24} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
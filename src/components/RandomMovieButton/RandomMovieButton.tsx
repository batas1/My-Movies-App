'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

interface RandomMovieButtonProps {
  movies: any[];
}

const RandomMovieButton: React.FC<RandomMovieButtonProps> = ({ movies }) => {
  const router = useRouter();

  const handleRandomMovie = () => {
    if (movies && movies.length > 0) {
      // Get a random movie from the array
      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex];
      
      // Navigate to the movie detail page
      router.push(`/movie/${randomMovie.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={handleRandomMovie}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-4 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center space-x-2 group"
      >
        <Sparkles className="text-yellow-300 group-hover:animate-pulse" size={24} />
        <span className="text-lg">Surprise Me with a Random Movie</span>
      </button>
    </div>
  );
};

export default RandomMovieButton;
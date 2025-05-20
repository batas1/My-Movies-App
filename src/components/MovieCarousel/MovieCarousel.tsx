import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { IMovieDetail } from '@/types/movie';
import { isFutureDate } from '@/utils/dateUtils';
import Link from 'next/link';
import Config from '@/config';
import { formatDate } from '@/utils/dateUtils';

export interface MovieCarouselProps {
  title: string;
  movies: IMovieDetail[];
  icon: React.ReactNode;
  showFutureIndicator?: boolean;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  movies,
  icon,
  showFutureIndicator = false
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Function to show movie info tooltip
  const showInfo = (index: number) => {
    setActiveIndex(index);
  };

  // Function to hide movie info tooltip
  const hideInfo = () => {
    setActiveIndex(null);
  };
  
  return (
    <div className="mb-16">
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          {icon}
          <h2 className="text-2xl font-bold ml-2 text-gray-800">{title}</h2>
        </div>
      </div>
      
      <div className="relative group">
        <button 
          onClick={scrollLeft} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full shadow-md p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Scroll left"
        >
          <ChevronLeft className="text-gray-700" size={20} />
        </button>
        
        <div className="overflow-x-auto hide-scrollbar" ref={carouselRef}>
          <div className="flex space-x-6 pb-4" style={{ width: `${Math.max(100, movies.length * 15)}%` }}>
            {movies.map((movie, index) => (
              <div key={movie.id} className="w-48 flex-shrink-0 relative">
                <Link href={`/movie/${movie.id}`} className="block">
                  <div className="relative group/card">
                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-50 shadow-md transition-all duration-300 group-hover/card:shadow-lg">
                      {movie.poster_path ? (
                        <img 
                          src={`${Config.IMAGE_SOURCE}${movie.poster_path}`} 
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                          No image
                        </div>
                      )}
                      
                      {/* New hover overlay with animation */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-medium px-4 text-center">View details</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 px-1">
                    <h3 className="font-medium text-gray-800 text-sm mb-1 truncate">{movie.title}</h3>
                    <p className="text-gray-500 text-xs">
                      {movie.release_date ? 
                        (typeof movie.release_date === 'string' ?
                          formatDate(movie.release_date) :
                          formatDate(movie.release_date.toString())
                        ) : ""}
                      {showFutureIndicator && 
                        movie.release_date && 
                        isFutureDate(typeof movie.release_date === 'string' ? 
                          movie.release_date : 
                          movie.release_date.toString()
                        ) && (
                        <span className="ml-1 text-indigo-500 font-semibold">(Coming soon)</span>
                      )}
                    </p>
                  </div>
                </Link>
                
                {/* New rating component */}
                <div className="mt-1 px-1 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-800">{movie.vote_average.toFixed(1)}</span>
                      <span className="text-yellow-500 ml-1">★</span>
                    </div>
                  </div>
                  
                  {/* Info button */}
                  <button 
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                    onClick={() => showInfo(index)}
                    onMouseEnter={() => showInfo(index)}
                    onMouseLeave={hideInfo}
                    aria-label="Movie information"
                  >
                    <Info size={18} />
                  </button>
                </div>
                
                {/* Quick info tooltip */}
                {activeIndex === index && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-white rounded-lg shadow-lg text-xs z-20 transform transition-all duration-200 ease-in-out">
                    <p className="text-gray-800 font-medium mb-1">
                      {movie.title}
                    </p>
                    <p className="text-gray-600 line-clamp-3 mb-2">
                      {movie.overview || "No description available."}
                    </p>
                    <div className="flex justify-between text-gray-500">
                      <span>Rating: {movie.vote_average.toFixed(1)}/10</span>
                      <span>{movie.vote_count} votes</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={scrollRight} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full shadow-md p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Scroll right"
        >
          <ChevronRight className="text-gray-700" size={20} />
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
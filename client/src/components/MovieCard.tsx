import { Movies } from "@/types"
import { formatYear } from "@/utils/formatYear";
import { Link } from "react-router-dom";
import { useWatchlist } from "@/context/WatchlistContext";
import { PlusIcon, Check } from "lucide-react";
import {OrbitProgress} from 'react-loading-indicators'

interface MovieCardProps {
    movie: Movies;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist, isAdding } = useWatchlist();

    const isInWatchlist = watchlist.some((item) => item.id === movie.id);
    const isAddingMovie = isAdding(movie.id);

    const handleWatchlistClick = () => {
        if (isInWatchlist) {
            removeMovieFromWatchlist(movie.id)
        } else {
            addMovieToWatchlist(movie.id)
        }
    }

    return (
        <div 
            key={movie.id} 
            className="movie-card rounded-md bg-[#1f2833] flex flex-col pb-4 max-w-[235px] w-full"
        >
            <Link 
                to={`/movies/${movie.slug}`} 
                className="relative w-full"
            >
                    {movie.poster_url !== 'N/A' ? (
                        <div className="movie-image aspect-[2/3] overflow-hidden">
                            <img 
                                src={movie.poster_url} 
                                alt={`${movie.title} poster`} 
                                className="w-full h-full object-cover rounded-t-md"
                            />  
                        </div>
   
                    ) : (
                        <div className="aspect-[2/3] overflow-hidden">
                            <img 
                                src="/blank-poster.jpg" 
                                alt="blank poster image" 
                                className="w-full h-full object-cover rounded-t-md"
                            />  
                        </div>
                    )}
                <div className="absolute w-full h-full top-0 left-0 hover:bg-[rgba(41,41,41,0.1)]"></div>
            </Link>
            <div className="flex justify-between gap-2 pt-2 sm:pt-4 px-2">
                <div className="flex items-center gap-1">
                    <img src="/star-icon.svg" alt="star icon" />
                    <h5 className="text-xs sm:text-sm text-gray-300">
                        <span className="text-gray-300 text-xs sm:text-base font-medium">{movie.rating}</span>
                        /10
                    </h5>
                </div>
                <span className="text-yellow-300 text-xs">{formatYear(movie.release_date)}</span>
            </div>
            <h5 className="pt-2 px-2 text-gray-100 font-semibold text-sm sm:text-lg leading-5 flex-grow">{movie.title}</h5>
            <div className="px-2 pt-4">
                <button
                    onClick={handleWatchlistClick} 
                    className="bg-[rgba(90,115,146,0.2)] w-full px-4 py-1 rounded-3xl hover:bg-[rgba(90,115,146,0.3)] duration-200 flex items-center gap-2 justify-center"
                >
                    {isAddingMovie ? (
                        <OrbitProgress color="#06b6d4" style={{ fontSize: "4px" }}/>
                    ) : (
                        <>
                            {isInWatchlist ? (
                                <Check className="h-6 w-5" color="#06b6d4"/>
                            ) : (
                                <PlusIcon className="h-6 w-5" color="#06b6d4"/>
                            )}
                            <span className="text-cyan-500 text-sm sm:text-base font-medium">Watchlist</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}



export default MovieCard
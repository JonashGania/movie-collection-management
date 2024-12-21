import { Movies } from "@/types"
import { formatYear } from "@/utils/formatYear";
import { Link } from "react-router-dom";

interface MovieCardProps {
    movie: Movies;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link 
            to={`/movies/${movie.slug}`} 
            key={movie.id} 
            className="movie-card rounded-md bg-[#1f2833] flex flex-col pb-4 max-w-[235px] w-full"
        >
            <div className="relative w-full">
                {movie.poster_url ? (
                    <div className="movie-image">
                        <img 
                            src={movie.poster_url} 
                            alt={`${movie.title} poster`} 
                            className="w-full h-[350px] object-cover rounded-t-md"
                        />
                    </div>
                    
                ) : (
                    <div>No image available</div>
                )}
            </div>
            <div className="flex justify-between gap-2 pt-4 px-2">
                <div className="flex items-center gap-1">
                    <img src="/star-icon.svg" alt="star icon" />
                    <h5 className="text-sm text-gray-300">
                        <span className="text-gray-300 font-medium">{movie.rating}</span>
                        /10
                    </h5>
                </div>
                <span className="text-yellow-300 text-sm">{formatYear(movie.release_date)}</span>
            </div>
            <h5 className="pt-2 px-2 text-gray-100 font-semibold text-lg leading-5 flex-grow">{movie.title}</h5>
            <div className="px-2 pt-4">
                <button className="bg-[rgba(90,115,146,0.2)] w-full px-4 py-2 rounded-3xl hover:bg-[rgba(90,115,146,0.3)] duration-200 flex items-center gap-2 justify-center">
                    <img src="/plus-sign.svg" alt="plus sign" />
                    <span className="text-cyan-500 font-medium">Watchlist</span>
                </button>
            </div>
        </Link>
    )
}

export default MovieCard
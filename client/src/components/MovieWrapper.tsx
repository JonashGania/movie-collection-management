import { Movies } from "../types"
import MovieCard from "./MovieCard"

interface MovieWrapperProps {
    movies: { movies: Movies[]}
}

const MovieWrapper = ({ movies }: MovieWrapperProps) => {
    return (
        <div className="pt-8 pb-20">
            <div className="movie-wrapper w-full">
                {movies.movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    )
}   
export default MovieWrapper
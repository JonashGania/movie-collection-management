import { useWatchlist } from "@/context/WatchlistContext"
import { Link } from "react-router-dom";
import { formatYear } from "@/utils/formatYear";
import { Star } from "lucide-react";

const Watchlist = () => {
    const {watchlist} = useWatchlist();

    return (
        <section className="pt-12 flex-grow flex flex-col">
            <div className="max-w-7xl mx-auto w-full px-4">
                <h1 className="text-white text-3xl font-medium mb-4">Your Watchlist</h1>
                <p className="max-w-[700px] text-zinc-400">Your watchlists are saved here to track the movies you want to watch. You can sort your Watchlist by the rating, date, runtime and title.</p>
                
            </div>
            <div className="mt-8 w-full bg-white flex-grow">
                <div className="max-w-7xl mx-auto w-full px-4 py-8">
                    <ul className="flex flex-col px-4 py-2 max-w-2xl border border-gray-300 rounded-md">
                        {watchlist.map((movie) => (
                            <li key={movie.id} className="flex flex-col w-full py-4 border-b last:border-b-0 border-zinc-gray-300">
                                <div className="flex w-full items-center">
                                    <div className="w-20 mr-4">
                                        <img 
                                            className="w-full max-h-[100px] min-w-[75px] object-cover rounded-md" 
                                            src={movie.poster_url} 
                                            alt={`${movie.title} Poster`} 
                                        />
                                    </div>
                                    <div className="w-full flex flex-col">
                                        <div>
                                            <Link to={`/movies/${movie.slug}`} className="text-black  font-medium hover:text-gray-600">{movie.title}</Link>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="text-zinc-500">{formatYear(movie.release_date)}</span>
                                            <span className="text-zinc-500">{movie.duration}m</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4" fill="#facc15 " strokeWidth={0}/>
                                            <span className="text-zinc-500 text-sm ">{movie.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <p className="text-zinc-500 text-sm leading-5">{movie.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}


export default Watchlist

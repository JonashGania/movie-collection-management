import { Genres } from "@/types"
import { Link } from "react-router-dom"

interface GenresWrapperProps {
    genres: Genres[]
}

const GenresWrapper = ({ genres }: GenresWrapperProps) => {
    return (
        <div className="pt-8">
            <div className="genres-wrapper w-full">
                {genres.map(genre => (
                    <Link 
                        to={`/genres/${genre.slug}`} 
                        key={genre.id} 
                        className="rounded-md bg-[#1f2833] flex flex-col w-full"
                    >
                        <div className="w-full h-[170px] overflow-hidden]">
                            <img 
                                src={`/genre-images/${genre.name.toLowerCase()}.webp`} 
                                alt={`${genre.name} image`}
                                className="w-full h-full object-cover rounded-md" 
                            />
                        </div>
                        <div className="py-1 px-4">
                            <h4 className="text-white text-lg font-medium">{genre.name}</h4>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default GenresWrapper
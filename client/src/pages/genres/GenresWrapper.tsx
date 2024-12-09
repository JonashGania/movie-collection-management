import { Genres } from "@/types"

interface GenresWrapperProps {
    genres: Genres[]
}

const GenresWrapper = ({ genres }: GenresWrapperProps) => {
    return (
        <div className="pt-8">
            <div className="genres-wrapper w-full">
                {genres.map(genre => (
                    <div key={genre.id} className="rounded-md bg-[#1f2833] flex flex-col max-w-[355px] sm:max-w-[100%] w-full">
                        <div className="w-full h-[200px]">
                            <img 
                                src={`/genre-images/${genre.name.toLowerCase()}.webp`} 
                                alt={`${genre.name} image`}
                                className="w-full h-full object-cover rounded-md" 
                            />
                        </div>
                        <div className="py-1 px-4">
                            <h4 className="text-white text-lg font-semibold">{genre.name}</h4>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default GenresWrapper
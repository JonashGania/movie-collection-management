import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "@/api";

const GenresForm = () => {
    const [selectedGenre, setSelectedGenre] = useState<number[]>([]);

    const {data, isError, isLoading} = useQuery({
        queryKey: ['genres'],
        queryFn: () => getAllGenres() 
    })

    const handleGenreSelect = (genreId: number) => {
        setSelectedGenre((prev) => 
            prev.includes(genreId) ? prev.filter((g) => g !== genreId) : [...prev, genreId]
        )
    }

    return (
        <div className="">
            <h3 className="font-medium text-lg">Select movie genres</h3>
            <ul className="flex flex-wrap items-center gap-2 pt-4">
                {data && data.map((genre) => (
                    <li 
                        key={genre.id}
                        onClick={() => handleGenreSelect(genre.id)} 
                        className={`py-1 px-4 rounded-xl text-black font-medium text-sm cursor-pointer bg-zinc-300 ${
                                selectedGenre.includes(genre.id) ? 'bg-cyan-700' : 'bg-zinc-300 hover:bg-zinc-200'
                            }`}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>

            <div className="flex flex-col gap-2 pt-8 max-w-[350px] mx-auto">
                {selectedGenre.map((genre, index) => (
                    <div key={index} className="w-full py-2 px-2 border border-black rounded-md">
                        <span className="font-medium">{genre}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GenresForm
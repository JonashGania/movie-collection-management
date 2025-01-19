import { useQuery } from "@tanstack/react-query";
import { getAllGenres } from "@/api";

interface GenresFormProps {
    selectedGenres: string[],
    handleSetGenres: (genres: string[]) => void,
}

const GenresForm = ({ selectedGenres, handleSetGenres }: GenresFormProps) => {
    const {data} = useQuery({
        queryKey: ['genres'],
        queryFn: () => getAllGenres() 
    })

    const handleGenreSelect = (genreId: string) => {
        const updatedGenres = selectedGenres.includes(genreId) 
            ? selectedGenres.filter((g) => g !== genreId) 
            : [...selectedGenres, genreId]

        handleSetGenres(updatedGenres)
    }

    const selectedGenreNames = data
        ? data.filter((genre) => selectedGenres.includes(genre.id)).map((genre) => genre.name)
        : []

    return (
        <div className="">
            <h3 className="font-medium text-lg">Select movie genres</h3>
            <ul className="flex flex-wrap items-center gap-2 pt-4">
                {data && data.map((genre) => (
                    <li 
                        key={genre.id}
                        onClick={() => handleGenreSelect(genre.id)} 
                        className={`py-1 px-4 rounded-xl text-black font-medium text-xs sm:text-sm cursor-pointer ${
                                selectedGenres.includes(genre.id) ? 'bg-cyan-700' : 'bg-zinc-300 hover:bg-zinc-200'
                            }`}
                    >
                        {genre.name}
                    </li>
                ))}
            </ul>

            <div className="flex flex-col gap-2 pt-8 max-w-[350px] mx-auto">
                {selectedGenreNames.map((genre, index) => (
                    <div key={index} className="w-full py-2 px-2 border border-black rounded-md">
                        <span className="font-medium">{genre}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GenresForm
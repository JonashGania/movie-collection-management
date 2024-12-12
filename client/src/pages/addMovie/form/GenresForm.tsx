import { useState } from "react"

const GenresForm = () => {
    const genres = ['Action', 'Adventure', 'Animated Film', 'Animation', 'Anime', 'Biography', 'Comedy', 'Crime', 
                    'Documentary', 'Drama', 'Epic', 'Family', 'Fantasy', 'Fiction', 'History', 'Horror', 'Mafia',
                    'Musical', 'Mystery', 'Romance', 'Romantic Comedy', 'Sci-Fi', 'Sports', 'Superhero', 'Thriller',
                    'Tragedy', 'War', 'Western']

    const [selectedGenre, setSelectedGenre] = useState<string[]>([]);

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre((prev) => 
            prev.includes(genre) 
                ? prev.filter((g) => g !== genre)
                : [...prev, genre]
        )
    }

    return (
        <div className="">
            <h3 className="font-medium text-lg">Select movie genres</h3>
            <ul className="flex flex-wrap items-center gap-2 pt-4">
                {genres.map((genre, index) => (
                    <li 
                        key={index}
                        onClick={() => handleGenreSelect(genre)} 
                        className={`py-1 px-4 rounded-xl text-black font-medium text-sm cursor-pointer bg-zinc-300 ${
                                selectedGenre.includes(genre) ? 'bg-cyan-700' : 'bg-zinc-300 hover:bg-zinc-200'
                            }`}
                    >
                        {genre}
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
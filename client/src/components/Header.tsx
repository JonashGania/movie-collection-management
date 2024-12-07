import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="w-full">
            <nav className="max-w-7xl h-[100px] mx-auto px-4 flex items-center justify-between">
                <h1 className="text-cyan-300 text-xl font-semibold">Movie Collection</h1>
                <ul className="flex items-center gap-4 text-zinc-200 text-lg font-medium">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/movies"}>Movies</Link>
                    <Link to={"/genres"}>Genres</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header
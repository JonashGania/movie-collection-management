import { NavLink, Link } from "react-router-dom"
import { Menu, TvMinimalPlay } from "lucide-react";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Movies',
            link: '/movies'
        },
        {
            name: 'Genres',
            link: '/genres'
        },
    ];

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className="w-full">
            <nav className="max-w-7xl h-[100px] mx-auto px-4 flex items-center justify-between">
                <h1 className="text-cyan-300 text-xl font-semibold">Movie Collection</h1>
                <div className="hidden sm:flex items-center ">
                    <ul className="flex items-center gap-8 text-zinc-200 text-lg font-medium pr-3">
                        {links.map((item, index) => (
                            <NavLink 
                                to={item.link} 
                                key={index} 
                                className="text-white font-light text-lg"
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </ul>
                    <div className="pl-3 border-l-2 border-zinc-600">
                        <Link to={'/watchlist'} className="flex items-center gap-2">
                            <TvMinimalPlay className="h-5 w-5" color="#ffffff"/>
                           <span className="text-gray-200 font-semibold">Watchlist</span>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center sm:hidden gap-2">
                    <button onClick={handleSidebarToggle}>
                        <Menu className="h-7 w-7" color="#ffffff"/>
                    </button>
                    <span className="text-white font-medium text-lg">Menu</span>
                </div>
            </nav>
            <Sidebar
                menuItem={links} 
                isOpen={isOpen}
                handleSidebarToggle={handleSidebarToggle}
            />
        </header>
    )
}

export default Header
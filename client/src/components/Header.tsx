import { NavLink, Link } from "react-router-dom"
import { Menu, TvMinimalPlay, Film, Clapperboard } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthProvider";
import Sidebar from "./Sidebar";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { signOut } = useAuth();

    const links = [
        {
            name: 'Movies',
            link: '/',
            icon: <Clapperboard color="#ffffff"/>
        },
        {
            name: 'Genres',
            link: '/genres',
            icon: <Film color="#ffffff"/>
        },
        {
            name: 'Watchlist',
            link: '/watchlist',
            icon: <TvMinimalPlay color="#ffffff"/>
        }
    ];

    const handleSidebarToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className="w-full">
            <nav className="max-w-7xl h-[70px] sm:h-[100px] mx-auto px-4 flex items-center justify-between">
                <Link to={'/'}>
                    <img src="/logo.svg" alt="logo" className="h-[50px] w-[50px] sm:w-full sm:h-full"/>
                </Link>
                <div className="hidden sm:flex items-center gap-8">
                    <div className="flex items-center ">
                        <ul className="flex items-center gap-6 text-zinc-200 text-lg font-medium pr-3">
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
                    </div>
                    <div>
                        <Button 
                            onClick={signOut}
                            className="bg-cyan-500 text-white hover:bg-cyan-500 rounded-2xl"
                        >
                            Sign Out
                        </Button>
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
import { NavLink, Link } from "react-router-dom"


const Header = () => {
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

    return (
        <header className="w-full">
            <nav className="max-w-7xl h-[100px] mx-auto px-4 flex items-center justify-between">
                <h1 className="text-cyan-300 text-xl font-semibold">Movie Collection</h1>
                <div className="flex items-center">
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
                            <img src="/square-plus.svg" alt="icon" />
                           <span className="text-gray-200 font-semibold">Watchlist</span>
                        </Link>
                    </div>
                </div>
                
            </nav>
        </header>
    )
}

export default Header
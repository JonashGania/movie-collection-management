import { X } from "lucide-react"
import { Button } from "./ui/button"
import { NavLink } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"

interface Sidebar {
    menuItem: {name: string, link: string, icon: JSX.Element}[],
    isOpen: boolean,
    handleSidebarToggle: () => void
}

const Sidebar = ({ menuItem, isOpen, handleSidebarToggle }: Sidebar) => {
    const { signOut } = useAuth();

    return (
        <>
            <div className={`overlay fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)] duration-300 ease-linear z-30 ${isOpen ? 'openMenu' : 'opacity-0 invisible'}`}>
            </div>
            <div className={`sidebar h-full w-[300px] bg-zinc-800 fixed top-0 right-0 z-40 duration-300 ease-linear ${isOpen ? 'openMenu' : 'translate-x-[300px]'}`}>
                <div className="px-4 py-4">
                    <div className="flex justify-end">
                        <button 
                            onClick={handleSidebarToggle}
                            className="px-2 py-2 rounded-[50%] hover:bg-[rgba(160,160,160,0.1)]"
                        >
                            <X className="h-6 w-6" color="#ffffff"/>
                        </button>
                    </div>
                    <ul className="pt-2 flex flex-col pb-2 border-b border-b-zinc-600">
                        {menuItem.map((item, index) => (
                            <li key={index}>
                                <NavLink 
                                    to={item.link}
                                    onClick={handleSidebarToggle}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 py-2 px-2 group rounded-lg ${
                                            isActive ? 'bg-[rgba(102,102,102,0.4)]' : ''
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {item.icon}
                                            <span 
                                                className={`text-lg font-medium ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'} `}
                                            >
                                                {item.name}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <Button 
                        onClick={signOut}
                        className="text-white bg-cyan-500 w-full mt-4 rounded-2xl hover:bg-cyan-500"
                    >
                        Sign Out
                    </Button>
                </div>
            </div>
        </>
        
    )
}

export default Sidebar
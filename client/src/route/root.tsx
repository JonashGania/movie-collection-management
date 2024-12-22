import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { WatchlistProvider } from "@/context/WatchlistContext"

const Root = () => {
    return(
        <div className="font-inter bg-[#0b0c10] w-full min-h-screen flex flex-col">
            <WatchlistProvider>
                <Header />
                <Outlet />
            </WatchlistProvider>
        </div>
    )
}

export default Root
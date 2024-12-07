import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const Root = () => {
    return(
        <div className="font-inter bg-[#0b0c10] w-full min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}

export default Root
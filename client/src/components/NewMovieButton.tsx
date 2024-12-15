import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

const NewMovieButton = () => {
    return (
        <Button className="bg-transparent border border-gray-400 text-lg py-5">
            <Link to={'/add-movie'} className="flex items-center gap-2">
                <PlusIcon/>
                New movie
            </Link>
        </Button>
    )
}

export default NewMovieButton
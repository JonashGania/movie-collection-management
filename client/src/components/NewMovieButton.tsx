import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogTrigger } from "./ui/dialog"
import MovieModal from "./MovieModal"

const NewMovieButton = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="bg-transparent border border-gray-400 py-5 flex items-center gap-2">
                    <PlusIcon/>
                    <span className="sm:block hidden text-lg">New Movie</span>
                    <span className="sm:hidden block text-lg">Movie</span>
                </Button>
            </DialogTrigger>
            <MovieModal />
        </Dialog>
        
    )
}

export default NewMovieButton
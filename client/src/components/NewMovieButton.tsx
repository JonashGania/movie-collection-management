import { Button } from "./ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogTrigger } from "./ui/dialog"
import MovieModal from "./MovieModal"

const NewMovieButton = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button className="bg-transparent border border-gray-400 text-lg py-5 flex items-center gap-2">
                    <PlusIcon/>
                    New movie
                </Button>
            </DialogTrigger>
            <MovieModal />
        </Dialog>
        
    )
}

export default NewMovieButton
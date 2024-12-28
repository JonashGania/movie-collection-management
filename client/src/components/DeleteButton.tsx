import { Dialog, DialogTrigger } from "./ui/dialog"
import DeleteMovieModal from "./DeleteMovieModal"

const DeleteButton = ({ movieId }: {movieId: string | undefined}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="px-6 py-1 bg-red-600 hover:bg-red-500 rounded-3xl text-base sm:text-lg text-white font-medium"
                >
                    Delete
                </button>
            </DialogTrigger>
            <DeleteMovieModal movieId={movieId}/>
        </Dialog>
    )
}

export default DeleteButton
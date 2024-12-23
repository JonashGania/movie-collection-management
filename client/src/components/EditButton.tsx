import { Dialog, DialogTrigger } from "./ui/dialog"
import { MovieFormState } from "@/types"
import MovieModal from "./MovieModal"

interface EditButtonProps {
    movieData?: MovieFormState,
    movieId?: string
}

const EditButton = ({ movieData, movieId }: EditButtonProps) => {
    return (
        <Dialog>
            <DialogTrigger>
                <button className="px-6 py-1 bg-gray-300 hover:bg-white rounded-3xl text-base sm:text-lg font-medium"
                >
                    Edit
                </button>
            </DialogTrigger>
            <MovieModal initialData={movieData} movieId={movieId}/>
        </Dialog>
    )
}

export default EditButton
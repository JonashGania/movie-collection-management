import { Dialog, DialogTrigger } from "./ui/dialog"
import EditMovieModal from "./EditMovieModal"

const EditButton = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <button className="px-6 py-1 bg-gray-300 hover:bg-white rounded-3xl text-lg font-medium"
                >
                    Edit
                </button>
            </DialogTrigger>
            <EditMovieModal />
        </Dialog>
    )
}

export default EditButton
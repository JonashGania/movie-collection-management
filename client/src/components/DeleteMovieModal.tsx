import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog"
import { Button } from "./ui/button"
import { deleteMovie } from "@/api"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

const DeleteMovieModal = ({ movieId }: { movieId: string | undefined}) => {
    const { toast } = useToast();
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { mutate: mutation } = useMutation({
        mutationFn: deleteMovie,
        onSuccess: () => {
            toast({
                variant: 'default',
                title: 'Successful!',
                description: 'Movie was successfully deleted.'
            })

            queryClient.invalidateQueries({ queryKey: ['movies'] });

            navigate("/movies");
        },
        onError: (error: Error) => {
            toast({
                variant: 'destructive',
                title: 'Deletion Failed',
                description: error.message
            })
        }
    })

    const handleDeletion = () => {
        if (movieId) {
            mutation(movieId);
        } else {
            toast({
                variant: 'destructive',
                title: 'Deletion Failed',
                description: 'Movie ID is invalid or missing'
            })
        }
    }

    return (
        <DialogContent className="delete-modal-container max-w-md w-full px-8">
            <DialogHeader>
                <DialogTitle className="text-xl text-black">Confirm Delete</DialogTitle>
            </DialogHeader>
            <p className="font-normal text-zinc-600 pb-8">Are you sure you want to delete this movie?</p>
            <DialogFooter>
                <DialogClose asChild>
                    <Button className="bg-white text-black hover:bg-gray-200">Cancel</Button>
                </DialogClose>
                <Button 
                    className="bg-red-400 hover:bg-red-500 text-white"
                    onClick={handleDeletion}
                >
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default DeleteMovieModal
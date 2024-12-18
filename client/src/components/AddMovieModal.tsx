import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Button } from "./ui/button"
import MovieDetailsForm from "@/components/form/DetailsForm"
import GenresForm from "@/components/form/GenresForm"
import ActorsForm from "@/components/form/ActorsForm"
import DirectorsForm from "@/components/form/DirectorsForm"
import { useReducer } from "react"
import { initialState, movieFormReducer } from "@/reducers/movieFormReducer"
import { MovieFormState } from "@/types"
import { validateForm } from "@/utils/validateForm"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postCreateMovie } from "@/api"

const AddMovieModal = () => {
    const [state, dispatch] = useReducer(movieFormReducer, initialState);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const resetForm = () => {
        dispatch({ type: 'RESET' })
    }

    const { mutate: mutation, isPending } = useMutation({
        mutationFn: postCreateMovie, 
        onSuccess: () => {
            resetForm();
            toast({
                variant: 'default',
                title: 'Movie Created',
                description: 'The movie was successfully added!'
            })
            queryClient.invalidateQueries({ queryKey: ['movies'] });
        },
        onError: (error: Error) => {
            toast({
                variant: 'destructive',
                title: 'Submission Failed',
                description: error.message
            })
        } 
    })

    const handleSetField = (field: keyof MovieFormState, value: string | number ) => {
        dispatch({ type: 'SET_FIELD', field, value })
    }

    const handleSetGenre = (genres: number[]) => {
        dispatch({ type: 'SET_GENRES', genres })
    }

    const handleSetDirectors = (directors: string[]) => {
        dispatch({ type: 'SET_DIRECTORS', directors })
    }

    const handleSetActors = (actors: string[]) => {
        dispatch({ type: 'SET_ACTORS', actors })
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm(state);
        if (errors.length > 0) {
            toast({
                variant: "destructive",
                title: "Form submission failed",
                description: `Fix the errors:\n${errors.join("\n")}`
            })

            return
        }
        mutation(state)
    }
    

    return (
        <DialogContent className="max-w-xl w-full h-[600px] flex flex-col">
            <DialogHeader>
                <DialogTitle className="text-xl">Add New Movie</DialogTitle>
            </DialogHeader>

            <Tabs className="h-full">
                <TabsList className="bg-zinc-300 w-full">
                    <TabsTrigger value="details" className="px-8 w-full">Details</TabsTrigger>
                    <TabsTrigger value="genres" className="px-8 w-full">Genres</TabsTrigger>
                    <TabsTrigger value="directors" className="px-8 w-full">Directors</TabsTrigger>
                    <TabsTrigger value="actors" className="px-8 w-full">Actors</TabsTrigger>
                </TabsList>

                <form 
                    action="POST"
                    onSubmit={handleFormSubmit} 
                    className="flex flex-col justify-between h-[480px]" 
                >
                    <div className="overflow-y-auto">
                        <TabsContent value="details">
                            <MovieDetailsForm 
                                detailValues={state} 
                                handleSetField={handleSetField}
                            />
                        </TabsContent>
                        <TabsContent value="genres">
                            <GenresForm
                                selectedGenres={state.genres}
                                handleSetGenres={handleSetGenre}
                            />
                        </TabsContent>
                        <TabsContent value="directors">
                            <DirectorsForm
                                directors={state.directors}
                                handleSetDirectors={handleSetDirectors}
                            />
                        </TabsContent>
                        <TabsContent value="actors">
                            <ActorsForm
                                actors={state.actors}
                                handleSetActors={handleSetActors}
                            />
                        </TabsContent>
                    </div>
                    <Button type="submit" className="mt-4 text-lg">
                        {isPending ? 'Adding Movie...' : 'Add Movie'}
                    </Button>
                </form>
            </Tabs>
        </DialogContent>
    )
}

export default AddMovieModal
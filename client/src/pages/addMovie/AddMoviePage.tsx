import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import MovieDetailsForm from "./form/DetailsForm"
import GenresForm from "./form/GenresForm"
import DirectorsForm from "./form/DirectorsForm"
import ActorsForm from "./form/ActorsForm"
import React, { useReducer } from "react"
import { initialState, movieFormReducer } from "@/reducers/movieFormReducer"
import { MovieFormState } from "@/types"
import { validateForm } from "@/utils/validateForm"
import { useMutation } from "@tanstack/react-query"
import { postCreateMovie } from "@/api"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AddMoviePage = () => {
    const [state, dispatch] = useReducer(movieFormReducer, initialState);
    const { toast } = useToast();
    const navigate = useNavigate();

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
        console.log(state);
        mutation(state)
    }

   

    return (
        <div className="w-full min-h-screen bg-gray-200">
            <div className="max-w-xl w-full mx-auto px-4 pt-12">
                <div className="flex justify-between pb-12">
                    <h1 className="text-2xl font-bold">Add New Movie</h1>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center hover:underline"
                    >
                        <ChevronLeft className="h-5 w-5"/>
                        Back
                    </button>
                </div>

                <Tabs>
                    <TabsList className="bg-zinc-300">
                        <TabsTrigger value="details" className="px-8">Details</TabsTrigger>
                        <TabsTrigger value="genres" className="px-8">Genres</TabsTrigger>
                        <TabsTrigger value="directors" className="px-8">Directors</TabsTrigger>
                        <TabsTrigger value="actors" className="px-8">Actors</TabsTrigger>
                    </TabsList>
                    <form 
                        action="POST" 
                        onSubmit={handleFormSubmit} 
                    >
                        <div className="w-full h-[500px] bg-white rounded-md px-4 pt-2 pb-4 overflow-y-auto">
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
                        <Button type="submit" className="mt-4 w-full text-lg">
                            {isPending ? 'Adding Movie...' : 'Add Movie'}
                        </Button>
                    </form>
                </Tabs>
            </div>
        </div>
    )
}

export default AddMoviePage
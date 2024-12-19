import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"


const EditMovieModal = () => {
    return (
        <DialogContent className="max-w-xl w-full h-[600px] flex flex-col">
            <DialogHeader>
                <DialogTitle className="text-xl">Update Movie</DialogTitle>
            </DialogHeader>

            <Tabs className="h-full">
                <TabsList className="bg-zinc-300 w-full">
                    <TabsTrigger value="details" className="px-8 w-full">Details</TabsTrigger>
                    <TabsTrigger value="genres" className="px-8 w-full">Genres</TabsTrigger>
                    <TabsTrigger value="directors" className="px-8 w-full">Directors</TabsTrigger>
                    <TabsTrigger value="actors" className="px-8 w-full">Actors</TabsTrigger>
                </TabsList>

                <form 
                    action="PUT"
                    className="flex flex-col justify-between h-[480px]" 
                >

                </form>
            </Tabs>
        </DialogContent>
    )
}

export default EditMovieModal
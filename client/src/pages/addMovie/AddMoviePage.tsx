import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieDetailsForm from "./form/DetailsForm"
import GenresForm from "./form/GenresForm"
import DirectorsForm from "./form/DirectorsForm"
import ActorsForm from "./form/ActorsForm"

const AddMoviePage = () => {
    return (
        <div className="w-full min-h-screen bg-gray-200">
            <div className="max-w-xl w-full mx-auto px-4 pt-12">
                <h1 className="text-2xl font-bold pb-12">Add New Movie</h1>
                <Tabs>
                    <TabsList className="bg-zinc-300">
                        <TabsTrigger value="details" className="px-8">Details</TabsTrigger>
                        <TabsTrigger value="genres" className="px-8">Genres</TabsTrigger>
                        <TabsTrigger value="directors" className="px-8">Directors</TabsTrigger>
                        <TabsTrigger value="actors" className="px-8">Actors</TabsTrigger>
                    </TabsList>
                    <form action="POST" className="w-full h-[500px] bg-white rounded-md px-4 pt-2 pb-4 overflow-y-auto">
                        <TabsContent value="details">
                            <MovieDetailsForm/>
                        </TabsContent>
                        <TabsContent value="genres">
                            <GenresForm/>
                        </TabsContent>
                        <TabsContent value="directors">
                            <DirectorsForm/>
                        </TabsContent>
                        <TabsContent value="actors">
                            <ActorsForm/>
                        </TabsContent>
                    </form>
                </Tabs>
            </div>
        </div>
    )
}

export default AddMoviePage
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const MovieDetailsForm = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                    type="text" 
                    id="title" 
                    name="title"
                    className="text-black py-5"
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="w-[50%]">
                    <Label htmlFor="release-date">Release Date</Label>
                    <Input 
                        type="text" 
                        id="release-date" 
                        name="release_date" 
                        placeholder="'2000-01-20'" 
                        className="text-black py-5"
                    />
                </div>
                <div className="w-[50%]">
                    <Label htmlFor="rating">IMDB Rating</Label>
                    <Input 
                        type="number" 
                        id="rating" 
                        name="rating" 
                        placeholder="?/10" 
                        className="text-black py-5"
                    />
                </div>
                <div className="w-[50%]">
                    <Label htmlFor="duration">Duration</Label>
                    <Input 
                        type="number" 
                        id="duration" 
                        name="duration" 
                        placeholder="In minutes" 
                        className="text-black py-5"
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Description on what the movie is about" 
                    rows={6} 
                    className="resize-none"
                />
            </div>
        </div>
    )
}

export default MovieDetailsForm
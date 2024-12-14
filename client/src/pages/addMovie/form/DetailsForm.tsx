import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MovieFormState } from "@/types"

interface MovieDetailsFormProps {
    detailValues: MovieFormState
    handleSetField: (field: keyof MovieFormState, value: string | number) => void
}

const MovieDetailsForm = ({ detailValues, handleSetField }: MovieDetailsFormProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                    type="text"
                    value={detailValues.title} 
                    id="title" 
                    name="title"
                    className="text-black py-5"
                    onChange={(e) => handleSetField('title', e.target.value)}
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="w-[50%]">
                    <Label htmlFor="release-date">Release Date</Label>
                    <Input 
                        type="text"
                        value={detailValues.release_date} 
                        id="release-date" 
                        name="release_date" 
                        placeholder="YYYY-MM-DD" 
                        className="text-black py-5"
                        onChange={(e) => handleSetField('release_date', e.target.value)}
                    />
                </div>
                <div className="w-[50%]">
                    <Label htmlFor="rating">IMDB Rating</Label>
                    <Input 
                        type="number"
                        value={detailValues.rating} 
                        id="rating" 
                        name="rating" 
                        placeholder="Rating (0-10)" 
                        className="text-black py-5"
                        max="10"
                        min="0"
                        onChange={(e) => handleSetField('rating', parseInt(e.target.value, 10))}
                    />
                </div>
                <div className="w-[50%]">
                    <Label htmlFor="duration">Duration</Label>
                    <Input 
                        type="number"
                        value={detailValues.duration} 
                        id="duration" 
                        name="duration" 
                        placeholder="Duration (minutes)" 
                        className="text-black py-5"
                        min="1"
                        onChange={(e) => handleSetField('duration', parseInt(e.target.value, 10))}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    id="description"
                    value={detailValues.description} 
                    name="description" 
                    placeholder="Description on what the movie is about" 
                    rows={6} 
                    className="resize-none"
                    onChange={(e) => handleSetField('description', e.target.value)}
                />
            </div>
        </div>
    )
}

export default MovieDetailsForm
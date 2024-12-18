import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface DirectorsFormProps {
    directors: string[],
    handleSetDirectors: (directors: string[]) => void
}

const DirectorsForm = ({ directors, handleSetDirectors }: DirectorsFormProps) => {

    const onChangeDirectors = (index: number, value: string) => {
        const newValues = [...directors];
        newValues[index] = value;
        handleSetDirectors(newValues)
    }

    const addAnotherDirector = () => {
        handleSetDirectors([...directors, ''])
    }

    return (
        <div className="">
            <div className="flex flex-col gap-2 pb-8">
                {directors.map((director, index) => (
                    <div key={index} className="">
                        <Label htmlFor={`director-${index}`}>Director</Label>
                        <Input 
                            id={`director-${index}`}
                            type="text" 
                            placeholder="name" 
                            value={director}
                            onChange={(e) => onChangeDirectors(index, e.target.value)}
                            className="py-5"
                        />
                    </div>
                ))}
            </div>
            <Button 
                onClick={addAnotherDirector} 
                className="py-6" 
                type="button"
            >
                <PlusIcon/>
                Another Director
            </Button>
        </div>
    )
}

export default DirectorsForm
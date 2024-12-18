import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface ActorsFormProps {
    actors: string[],
    handleSetActors: (actors: string[]) => void
}

const ActorsForm = ({ actors, handleSetActors }: ActorsFormProps) => {
  
    const onChangeActors = (index: number, value: string) => {
        const newValues = [...actors];
        newValues[index] = value;
        handleSetActors(newValues);
    }

    const addAnotherActor = () => {
        handleSetActors([...actors, '']);
    }

    return (
        <div className="">
            <div className="flex flex-col gap-2 pb-8">
                {actors.map((actor, index) => (
                    <div key={index} className="">
                        <Label htmlFor={`actor-${index}`}>Actor</Label>
                        <Input 
                            id={`actor-${index}`}
                            type="text"
                            value={actor} 
                            placeholder="name" 
                            onChange={(e) => onChangeActors(index, e.target.value)}
                            className="py-5"
                        />
                    </div>
                ))}
            </div>
            <Button 
                className="py-6" 
                onClick={addAnotherActor} 
                type="button"
            >
                <PlusIcon/>
                Another Actor
            </Button>
        </div>
    )
}

export default ActorsForm
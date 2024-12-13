import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const ActorsForm = () => {
    const [actors, setActors] = useState(['']);

    return (
        <div className="">
            <div className="flex flex-col gap-2 pb-8">
                {actors.map((director, index) => (
                    <div key={index} className="">
                        <Label htmlFor="director">Actor</Label>
                        <Input 
                            id="director" 
                            type="text" 
                            placeholder="name" 
                            value={director}
                            className="py-5"
                        />
                    </div>
                ))}
            </div>
            <Button className="py-6">
                <PlusIcon/>
                Another Actor
            </Button>
        </div>
    )
}

export default ActorsForm
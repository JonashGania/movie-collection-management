import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react"

const DirectorsForm = () => {
    const [directors, setDirectors] = useState(['']);

    return (
        <div className="">
            <div className="flex flex-col gap-2 pb-8">
                {directors.map((director, index) => (
                    <div key={index} className="">
                        <Label htmlFor="director">Director</Label>
                        <Input 
                            id="director" 
                            type="text" 
                            name="director" 
                            placeholder="name" 
                            value={director}
                            className="py-5"
                        />
                    </div>
                ))}
            </div>
            <Button className="py-6">
                <PlusIcon/>
                Another Director
            </Button>
        </div>
    )
}

export default DirectorsForm
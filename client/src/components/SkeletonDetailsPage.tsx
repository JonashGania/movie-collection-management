import { Skeleton } from "./ui/skeleton"

const SkeletonDetailsPage = () => {
    return (
        <>
            <div className="flex justify-between gap-8">
                <div>
                    <Skeleton className="w-[250px] sm:w-[450px] h-12 rounded-md bg-zinc-700"/>
                    <div className="flex gap-4 pt-2">
                        <Skeleton className="w-[70px] h-5 rounded-md bg-zinc-700"/>
                        <Skeleton className="w-[70px] h-5 rounded-md bg-zinc-700"/>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 flex-col">
                    <Skeleton className="w-[90px] h-5 rounded-md bg-zinc-700"/>
                    <Skeleton className="w-[75px] h-7 rounded-md bg-zinc-700"/>
                </div>
            </div>

            <div className="flex w-full pt-4 gap-4">
                <div className="w-[25%] min-w-[120px] sm:min-w-[150px] ">
                    <Skeleton className="w-full h-[180px] sm:h-[250px] md:h-[350px] rounded-md bg-zinc-700"/>
                </div>
                <div className="flex-grow flex flex-col justify-between gap-4">
                    <div>
                        <div className="flex items-center flex-wrap gap-4">
                            <Skeleton className="w-[80px] h-7 rounded-md bg-zinc-700"/>
                            <Skeleton className="w-[80px] h-7 rounded-md bg-zinc-700"/>
                            <Skeleton className="w-[80px] h-7 rounded-md bg-zinc-700"/>
                            <Skeleton className="w-[80px] h-7 rounded-md bg-zinc-700"/>
                        </div>
                        <div className="pt-4 hidden sm:block">
                            <Skeleton className="w-full h-6 rounded-md bg-zinc-700 mb-2"/>
                            <Skeleton className="w-full h-6 rounded-md bg-zinc-700"/>
                        </div>
                        <div className="pt-4 hidden sm:flex gap-4">
                            <Skeleton className="w-[80px] h-6 rounded-md bg-zinc-700"/>
                            <Skeleton className="w-[80px] h-6 rounded-md bg-zinc-700"/>
                            <Skeleton className="w-[80px] h-6 rounded-md bg-zinc-700"/>
                        </div>
                        <div className="pt-4 hidden sm:flex gap-4">
                            <Skeleton className="w-[80px] h-6 rounded-md bg-zinc-700"/>
                            <Skeleton className="w-[80px] h-6 rounded-md bg-zinc-700"/>
                            <Skeleton className="w-[80px] h-6 rounded-md bg-zinc-700"/>
                        </div>
                    </div>
                    <div className="hidden sm:flex gap-4">
                        <Skeleton className="w-[150px] h-8 rounded-2xl bg-zinc-700"/>
                        <Skeleton className="w-[110px] h-8 rounded-2xl bg-zinc-700"/>
                        <Skeleton className="w-[110px] h-8 rounded-2xl bg-zinc-700"/>
                    </div>
                </div>
            </div>

            <div className="block sm:hidden pt-4 ">
                <div >
                    <Skeleton className="w-full h-6 rounded-md bg-zinc-700 mb-2"/>
                    <Skeleton className="w-full h-6 rounded-md bg-zinc-700"/>
                </div>
                <div className="pt-4 flex gap-2">
                    <Skeleton className="w-[70px] h-6 rounded-md bg-zinc-700"/>
                    <Skeleton className="w-[70px] h-6 rounded-md bg-zinc-700"/>
                    <Skeleton className="w-[70px] h-6 rounded-md bg-zinc-700"/>
                </div>
                <div className="pt-4 flex gap-2">
                    <Skeleton className="w-[70px] h-6 rounded-md bg-zinc-700"/>
                    <Skeleton className="w-[70px] h-6 rounded-md bg-zinc-700"/>
                    <Skeleton className="w-[70px] h-6 rounded-md bg-zinc-700"/>
                </div>
                <div className="flex gap-2 pt-4">
                    <Skeleton className="w-[150px] h-8 rounded-2xl bg-zinc-700"/>
                    <Skeleton className="w-[110px] h-8 rounded-2xl bg-zinc-700"/>
                    <Skeleton className="w-[110px] h-8 rounded-2xl bg-zinc-700"/>
                </div>
            </div>
        </>
    )
}

export default SkeletonDetailsPage
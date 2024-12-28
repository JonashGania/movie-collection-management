import { Button } from "@/components/ui/button"
import { OrbitProgress } from "react-loading-indicators"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <>
            <Helmet>
                <title>404 Error</title>
                <meta name="description" content="Oops, an error occured"/>
            </Helmet>
            <div className="w-full min-h-screen bg-[#0b0c10] font-inter flex items-center justify-center">
                <div className="flex items-center flex-col px-4 gap-6">
                    <h1 className="text-4xl font-bold text-white">Error: 404</h1>
                    <h2 className="text-white text-2xl font-semibold">Nothing to see here!</h2>
                    <p className="text-zinc-400 max-w-[400px] text-center">Sorry, we couldn't find what you were looking for. Head back to the main page and start over again. Thank you!</p>
                    <Button
                        onClick={handleNavigate}
                        className="bg-cyan-500 hover:bg-cyan-600 text-base sm:text-lg px-4 py-6 rounded-3xl mb-6"
                    >
                        Go Home
                    </Button>
                    <OrbitProgress color="#06b6d4" style={{ fontSize: "10px" }}/>
                </div>
            </div>
        </>

    )
}

export default ErrorPage
import { Helmet } from "react-helmet-async"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { z, ZodError } from 'zod'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"

const signInSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
})

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState<{
        username?: string,
        password?: string,
        submit?: string
    }>({})

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {signIn} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            setIsSubmitting(true)

            const validatedData = signInSchema.parse(formData);
            await signIn(validatedData)
            navigate('/');
        } catch (error: any) {
            if (error instanceof ZodError) {
                const formattedErrors: Record<string, string> = {}
                error.errors.forEach((err) => {
                    if (err.path) {
                        formattedErrors[err.path[0]] = err.message
                    }
                })
                setErrors(formattedErrors)
            } else {
                const errorMessage = error.toString();
                if (errorMessage.includes('Username does not exist.')) {
                    setErrors({ username: errorMessage})
                } else if (errorMessage.includes('Incorrect password.')) {
                    setErrors({ password: errorMessage })
                } else {
                    setErrors({ submit: 'An unexpected error occured. Please try again.' });
                }
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value }))

        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({...prev, [name]: undefined}))
        }
    }
    return (
        <>
            <Helmet>
                <title>Sign In</title>
                <meta name="description" content="Browse movies that you like and you can add your favorite movie."/>
            </Helmet>
            <section className="w-full h-screen bg-[#0b0c10] grid place-items-center">
                <Card className="max-w-[400px] w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Sign In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col w-full gap-4">
                                <div>
                                    <Label htmlFor="username" >Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        placeholder="Enter username"
                                        autoComplete="off"
                                        className="mt-2 mb-1"
                                        onChange={handleChange}
                                    />
                                    {errors.username && 
                                        <span className="text-red-500 font-medium text-sm pl-2">{errors.username}</span>
                                    }
                                </div>
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        placeholder="Enter password"
                                        className="mt-2 mb-1"
                                        onChange={handleChange}
                                    />
                                     {errors.password && 
                                        <span className="text-red-500 font-medium text-sm pl-2">{errors.password}</span>
                                    }
                                </div>
                                {errors.submit && <span className="text-red-500 font-medium text-sm">{errors.submit}</span>}
                            </div>
                            <Button type="submit" className="w-full mt-12">
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>
                        <div className="pt-2 text-center">
                            <span className="text-black text-sm">Don't have an account? </span>
                            <a href="/sign-up" className="text-black font-semibold hover:underline text-sm">Sign up.</a>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}

export default SignIn
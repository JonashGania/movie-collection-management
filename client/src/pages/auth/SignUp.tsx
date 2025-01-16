import { Helmet } from "react-helmet-async"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z, ZodError } from 'zod'
import { useState } from "react"
import { useAuth } from "@/context/AuthProvider"
import { useNavigate } from "react-router-dom"

const signInSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(8, 'Password must at least be 8 characters'),
    confirm: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm']
})

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm: ''
    })
    const [errors, setErrors] = useState<{
        username?: string,
        password?: string,
        confirm?: string,
        submit?: string
    }>({})

    const [isSubmitting, setIsSubmitting] = useState(false);
    const {signUp} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            setIsSubmitting(true)

            const validatedData = signInSchema.parse(formData);
            const { username, password } = validatedData;
            await signUp({ username, password })
            navigate('/sign-in');
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
                if (errorMessage.includes('Username is already taken.')) {
                    setErrors({ username: errorMessage})
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
                <title>Sign Up</title>
                <meta name="description" content="Browse movies that you like and you can add your favorite movie."/>
            </Helmet>
            <section className="w-full h-screen bg-[#0b0c10] grid place-items-center">
                <Card className="max-w-[400px] w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col w-full gap-2">
                                <div>
                                    <Label htmlFor="username" >Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        placeholder="Enter username"
                                        autoComplete="off"
                                        className={`mt-2 mb-1 ${errors.username ? 'border-red-500' : 'border-zinc-300'}`}
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
                                        className={`mt-2 mb-1 ${errors.password ? 'border-red-500' : 'border-zinc-300'}`}
                                        onChange={handleChange}
                                    />
                                    {errors.password && 
                                        <span className="text-red-500 font-medium text-sm pl-2">{errors.password}</span>
                                    } 
                                </div>
                                <div>
                                    <Label htmlFor="confirm-pass">Confirm Password</Label>
                                    <Input
                                        id="confirm-pass"
                                        type="password"
                                        name="confirm"
                                        value={formData.confirm}
                                        className={`mt-2 mb-1 ${errors.confirm ? 'border-red-500' : 'border-zinc-300'}`}
                                        onChange={handleChange}
                                    />
                                    {errors.confirm && 
                                        <span className="text-red-500 font-medium text-sm pl-2">{errors.confirm}</span>
                                    } 
                                </div>
                                {errors.submit && <span className="text-red-500 font-medium text-sm">{errors.submit}</span>}
                            </div>
                            <Button type="submit" className="w-full mt-12">
                                {isSubmitting ? 'Creating account...' : 'Create account'}
                            </Button>
                        </form>
                        <div className="pt-2 text-center">
                            <span className="text-black text-sm">Already have an account? </span>
                            <a href="/sign-in" className="text-black font-semibold hover:underline text-sm">Sign in.</a>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </>
    )
}

export default SignUp
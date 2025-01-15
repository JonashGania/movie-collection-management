import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { AuthData } from "@/types";
import axiosInstance from "@/utils/axiosInstance";

interface AuthContextProps {
    isAuthenticated: boolean;
    signIn: (signInData: AuthData) => Promise<void>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/check-auth', { withCredentials: true });
                setIsAuthenticated(response.data.isAuthenticated)
            } catch (error) {
                console.error('Error fetching authentication status', error);
                setIsAuthenticated(false)
            } 
        }

        checkAuth();
    }, [])

    const signIn = async (signInData: AuthData) => {
        try {
            const response =  await axiosInstance.post('/login', signInData, { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error during sign-in', error)
            setIsAuthenticated(false);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
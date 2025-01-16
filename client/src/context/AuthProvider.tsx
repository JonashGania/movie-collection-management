import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { AuthData } from "@/types";
import axiosInstance from "@/utils/axiosInstance";

interface AuthContextProps {
    isAuthenticated: boolean;
    signIn: (signInData: AuthData) => Promise<void>;
    signUp: (signUpData: AuthData) => Promise<void>;
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
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            setIsAuthenticated(true);
        } catch (error: any) {
            setIsAuthenticated(false);
            throw error.response.data.message
        }
    }

    const signUp = async (signUp: AuthData) => {
        try {
            const response =  await axiosInstance.post('/sign-up', signUp, { 
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        } catch (error: any) {
            throw error.response.data.message
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signUp, signIn, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
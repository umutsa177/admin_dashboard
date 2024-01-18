// authProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {toast} from "react-toastify";

interface User {
    email: string;
    password: string;
}

interface AuthContextProps {
    user: User | null;
    signIn: (credentials: User) => void;
    signOut: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const cookies = new Cookies();



    const signIn = async (credentials: User) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
            console.log('response', response)
            if(response.status === 200) {
                const { token, user } = response.data;
                setUser(user);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(token));
                router.push('/');
                toast.success('Giriş Başarılı');
            }

        } catch (error: any) {
            console.error('SignIn Error:', error);
            toast.error(error.response.data.message)
        }
    };

    const signOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        router.push('/auth/signIn');
    };


    const contextValues: AuthContextProps = {
        user,
        signIn,
        signOut,
        isAuthenticated,

    };

    return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

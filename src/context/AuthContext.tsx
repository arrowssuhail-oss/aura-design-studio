import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
// import GoogleAuthSimulation from "@/components/GoogleAuthSimulation";

interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password?: string) => boolean;
    loginWithGoogle: (isSignup?: boolean) => void;
    handleGoogleCredential: (credential: string, isSignup?: boolean) => void;
    register: (name: string, email: string, password: string) => void;
    logout: () => void;
    getAllUsers: () => any[]; // For admin view
    setIsGoogleAuthOpen: (open: boolean) => void;
    isGoogleAuthOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { user: clerkUser, isLoaded } = useUser();
    const { openSignIn, signOut, openSignUp } = useClerk();
    const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);

    // Map Clerk user to our User interface
    const user: User | null = clerkUser ? {
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        name: clerkUser.fullName || clerkUser.firstName || "User",
    } : null;

    const login = (email: string, password?: string) => {
        // Clerk handles login via its own UI, but if we need a manual trigger:
        openSignIn();
        return true;
    };

    const loginWithGoogle = (isSignup: boolean = false) => {
        if (isSignup) {
            openSignUp();
        } else {
            openSignIn();
        }
    };

    const handleGoogleCredential = (credential: string, isSignup: boolean = false) => {
        // Deprecated simulation method, just open Clerk
        openSignIn();
    };

    const register = (name: string, email: string, password: string) => {
        openSignUp();
    };

    const logout = () => {
        signOut();
    };

    const getAllUsers = () => {
        return [];
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithGoogle, handleGoogleCredential, register, logout, getAllUsers, isGoogleAuthOpen, setIsGoogleAuthOpen }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

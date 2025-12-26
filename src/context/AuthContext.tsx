import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import GoogleAuthSimulation from "@/components/GoogleAuthSimulation";

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
    const [user, setUser] = useState<User | null>(null);
    const [isGoogleAuthOpen, setIsGoogleAuthOpen] = useState(false);
    const [isSignupContext, setIsSignupContext] = useState(false);

    // Initialize session from localStorage
    useEffect(() => {
        const savedSession = localStorage.getItem("arrows_session");
        if (savedSession) {
            setUser(JSON.parse(savedSession));
        }
    }, []);

    const login = (email: string, password?: string) => {
        // For the admin account, we can have a bypass or mock
        if (email === "arrows.suhail@gmail.com") {
            const adminUser = { email, name: "Admin" };
            setUser(adminUser);
            localStorage.setItem("arrows_session", JSON.stringify(adminUser));
            return true;
        }

        // Check against registered users in localStorage
        const usersStr = localStorage.getItem("arrows_users");
        if (usersStr) {
            const users = JSON.parse(usersStr);
            const foundUser = users.find((u: any) => u.email === email && u.password === password);
            if (foundUser) {
                const sessionUser = { email: foundUser.email, name: foundUser.name };
                setUser(sessionUser);
                localStorage.setItem("arrows_session", JSON.stringify(sessionUser));
                return true;
            }
        }
        return false;
    };

    const register = (name: string, email: string, password: string) => {
        const usersStr = localStorage.getItem("arrows_users");
        const users = usersStr ? JSON.parse(usersStr) : [];

        // Check if user already exists
        if (users.find((u: any) => u.email === email)) return;

        const newUser = { name, email, password, registeredAt: new Date().toISOString() };
        users.push(newUser);
        localStorage.setItem("arrows_users", JSON.stringify(users));

        // Log in immediately
        const sessionUser = { email, name };
        setUser(sessionUser);
        localStorage.setItem("arrows_session", JSON.stringify(sessionUser));
    };

    const loginWithGoogle = (isSignup: boolean = false) => {
        setIsSignupContext(isSignup);
        setIsGoogleAuthOpen(true);
    };

    const handleGoogleCredential = (credential: string, isSignup: boolean = false) => {
        // In a real app, you'd send this to your server to verify.
        // For this simulation, we'll "decode" the JWT (very roughly) to extract name/email if possible.
        // Or just simulate a successful login with a mock user based on the fact we got a credential.
        console.log("Encoded JWT ID token: " + credential);

        // Simulating decoding: In reality, use a library like jwt-decode
        // For now, we'll just mock a successful Google login.
        const mockGoogleUser = {
            email: "google-user@gmail.com", // This would come from the JWT
            name: "Google User"
        };

        completeGoogleAuth(mockGoogleUser, isSignup);
    };

    const handleGoogleSelect = (account: any) => {
        setIsGoogleAuthOpen(false);
        const googleUser = {
            email: account.email,
            name: account.name
        };
        completeGoogleAuth(googleUser, isSignupContext);
    };

    const completeGoogleAuth = (googleUser: User, isSignup: boolean) => {
        if (isSignup) {
            // Context: SIGN UP
            const usersStr = localStorage.getItem("arrows_users");
            const users = usersStr ? JSON.parse(usersStr) : [];

            if (!users.find((u: any) => u.email === googleUser.email)) {
                users.push({ ...googleUser, registeredAt: new Date().toISOString(), provider: "google" });
                localStorage.setItem("arrows_users", JSON.stringify(users));
            }

            setUser(googleUser);
            localStorage.setItem("arrows_session", JSON.stringify(googleUser));
        } else {
            // Context: LOGIN
            const usersStr = localStorage.getItem("arrows_users");
            if (usersStr) {
                const users = JSON.parse(usersStr);
                const foundUser = users.find((u: any) => u.email === googleUser.email);
                if (foundUser) {
                    const sessionUser = { email: foundUser.email, name: foundUser.name };
                    setUser(sessionUser);
                    localStorage.setItem("arrows_session", JSON.stringify(sessionUser));
                    return;
                }
            }
            // Auto-fallback for mock purpose
            setUser(googleUser);
            localStorage.setItem("arrows_session", JSON.stringify(googleUser));
        }
        setIsGoogleAuthOpen(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("arrows_session");
    };

    const getAllUsers = () => {
        const usersStr = localStorage.getItem("arrows_users");
        return usersStr ? JSON.parse(usersStr) : [];
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithGoogle, handleGoogleCredential, register, logout, getAllUsers, isGoogleAuthOpen, setIsGoogleAuthOpen }}>
            {children}
            <GoogleAuthSimulation
                isOpen={isGoogleAuthOpen}
                onClose={() => setIsGoogleAuthOpen(false)}
                onSelectAccount={handleGoogleSelect}
                isSignup={isSignupContext}
            />
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

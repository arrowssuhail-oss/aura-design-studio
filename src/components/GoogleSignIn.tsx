import { useEffect } from "react";

interface GoogleSignInProps {
    onSuccess: (credential: string) => void;
    clientId?: string;
}

declare global {
    interface Window {
        google: any;
        handleCredentialResponse: (response: any) => void;
    }
}

export default function GoogleSignIn({ onSuccess, clientId = "21800024314-5jjrtu4rfgprejql2489obbmcc76pt4h.apps.googleusercontent.com" }: GoogleSignInProps) {
    useEffect(() => {
        // Initialize Google Sign-In
        const initializeGoogleSignIn = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: window.handleCredentialResponse,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById("google-signin-button"),
                    { theme: "outline", size: "large", width: "100%" }
                );
            }
        };

        // Define the callback in window so it's accessible by GIS
        window.handleCredentialResponse = (response: any) => {
            onSuccess(response.credential);
        };

        // If the script is already loaded, initialize immediately
        if (window.google) {
            initializeGoogleSignIn();
        } else {
            // Otherwise, wait or use an interval to check (async/defer script)
            const interval = setInterval(() => {
                if (window.google) {
                    initializeGoogleSignIn();
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [clientId, onSuccess]);

    return <div id="google-signin-button" className="w-full"></div>;
}

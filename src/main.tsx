import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App.tsx";
import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
    <div className="bg-background text-foreground min-h-screen">
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <App />
            <SpeedInsights />
        </ClerkProvider>
    </div>
);

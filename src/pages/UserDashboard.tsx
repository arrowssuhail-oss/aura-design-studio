import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast";
import { Download, CreditCard, ExternalLink, Package, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface UserData {
    email: string;
    role: string;
    stats: {
        downloads: number;
        spent: number;
    };
    transactions: any[];
    downloads: any[];
}

export default function UserDashboard() {
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                // Fetch centralized user data
                // In a real app this would be an API call, but we are simulating with JSON file
                // For development we can import it, but to simulate "fetching" we usually read the file
                // Since this is client-side, we might need a way to read the JSON.
                // For now, we'll try to fetch it if served, or fallback to a method to read it.
                // Actually, importing the JSON directly in Vite is the easiest way to read it.

                // Dynamic import to avoid caching issues during dev if we were writing to it, 
                // but standard import is fine for initial load.
                const response = await import("@/data/users.json");
                const allUsers = response.users || {};
                const currentUserData = allUsers[user.id];

                if (currentUserData) {
                    setUserData(currentUserData);
                } else {
                    // Auto-register handling is done in the parent Dashboard wrapper or here?
                    // If we are here, we expect data. If missing, layout might trigger registration.
                    // For UI purposes, we'll show empty state.
                    setUserData({
                        email: user.email,
                        role: 'user',
                        stats: { downloads: 0, spent: 0 },
                        transactions: [],
                        downloads: []
                    });
                }
            } catch (error) {
                console.error("Failed to load user data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-fade-up">
                        <div>
                            <span className="text-accent text-sm font-medium uppercase tracking-widest">Client Portal</span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-2">Hello, {user.name || "Creator"}</h1>
                            <p className="text-muted-foreground mt-2">Track your purchases and downloads.</p>
                        </div>

                        {/* Account Management */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="gap-2 rounded-xl">
                                    <User className="w-4 h-4" />
                                    Manage Account
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0 bg-transparent border-none">
                                <div className="h-full w-full bg-background/95 backdrop-blur-xl p-6">
                                    <UserProfile
                                        routing="hash"
                                        appearance={{
                                            elements: {
                                                rootBox: "w-full h-full",
                                                card: "shadow-none border-none bg-transparent w-full",
                                                navbar: "hidden",
                                                pageScrollBox: "p-0"
                                            }
                                        }}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                        <div className="glass-card p-6 flex items-center justify-between animate-fade-up" style={{ animationDelay: '0.1s' }}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                                    <Download className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Downloads</p>
                                    <p className="text-2xl font-bold font-mono">{userData?.stats.downloads || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-6 flex items-center justify-between animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Spent</p>
                                    <p className="text-2xl font-bold font-mono">₹{userData?.stats.spent || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Recent Activity / Downloads */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-card p-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Package className="w-5 h-5 text-accent" />
                                    Your Downloads
                                </h3>

                                {userData?.downloads && userData.downloads.length > 0 ? (
                                    <div className="space-y-4">
                                        {userData.downloads.map((item: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/10">
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                                                </div>
                                                <Button size="sm" variant="ghost" className="gap-2">
                                                    <Download className="w-4 h-4" /> Download
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-xl">
                                        <p className="text-muted-foreground">No downloads yet.</p>
                                        <Button variant="link" className="text-accent mt-2">Browse Projects</Button>
                                    </div>
                                )}
                            </div>

                            <div className="glass-card p-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-accent" />
                                    Transaction History
                                </h3>

                                {userData?.transactions && userData.transactions.length > 0 ? (
                                    <div className="space-y-4">
                                        {userData.transactions.map((tx: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/10">
                                                <div>
                                                    <p className="font-semibold">{tx.description || "Payment"}</p>
                                                    <p className="text-xs text-muted-foreground">ID: {tx.paymentId}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono font-bold">₹{tx.amount}</p>
                                                    <p className="text-xs text-green-500">Success</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground text-sm">No transactions found.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Support / Info Sidebar */}
                        <div className="space-y-6">
                            <div className="glass-card p-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
                                <h4 className="font-bold mb-2">Need Help?</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Issues with your downloads or payments? Contact our support team.
                                </p>
                                <Button variant="outline" className="w-full gap-2">
                                    <ExternalLink className="w-4 h-4" /> Support Center
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

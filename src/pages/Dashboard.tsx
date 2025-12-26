import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    User,
    Settings,
    LayoutDashboard,
    FolderLock,
    Bell,
    LogOut,
    ChevronRight,
    ExternalLink,
    Plus,
    History,
    ShieldCheck,
    Trash2,
    CreditCard
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [displayName, setDisplayName] = useState(user?.name || user?.email.split('@')[0] || "");
    const [isSaving, setIsSaving] = useState(false);
    const [projectUpdates, setProjectUpdates] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);

    const handleSaveChanges = () => {
        setIsSaving(true);
        // Simulate API call and persist to session for mockup persistence
        setTimeout(() => {
            const updatedUser = { ...user, name: displayName };
            localStorage.setItem("arrows_session", JSON.stringify(updatedUser));

            setIsSaving(false);
            toast({
                title: "Settings updated",
                description: "Your studio preferences and notification settings have been saved.",
            });
        }, 1200);
    };

    const isAdmin = user?.email === "arrows.suhail@gmail.com";

    if (!user || !isAdmin) {
        // If not logged in or not admin, show access denied
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-6 bg-gradient-to-b from-background to-accent/5">
                    <div className="glass-card p-12 text-center max-w-md animate-fade-up border-rose-500/20">
                        <FolderLock className="w-16 h-16 text-rose-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold mb-4">{!user ? "Access Denied" : "Admin Only Area"}</h1>
                        <p className="text-muted-foreground mb-8">
                            {!user
                                ? "Please sign in to access the studio administrative tools."
                                : "This area is reserved for studio administrators. Please return to the homepage."
                            }
                        </p>
                        <Button variant="accent" onClick={() => navigate(!user ? "/login" : "/")} className="w-full">
                            {!user ? "Sign In" : "Back to Home"}
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const stats = [
        { label: "Active Projects", value: "3", icon: LayoutDashboard, color: "text-blue-500" },
        { label: "Design Files", value: "12", icon: FolderLock, color: "text-amber-500" },
        { label: "Notifications", value: "2", icon: Bell, color: "text-rose-500" },
    ];

    const recentProjects = [
        { id: 1, name: "Web Design Production", status: "In Review", path: "/projects/ecommerce-platform" },
        { id: 2, name: "Video Editing Suite", status: "Updated", path: "/projects/mobile-app-design" },
        { id: 3, name: "Graphic Design Brand", status: "Published", path: "/projects/brand-identity" },
        { id: 4, name: "UI/UX Design System", status: "Active", path: "/projects/fintech-dashboard" },
    ];

    const activityHistory = [
        { id: 1, type: "Login", date: "Today, 10:45 AM", device: "Chrome / Windows", status: "Success" },
        { id: 2, type: "Login", date: "Yesterday, 02:15 PM", device: "Safari / iPhone", status: "Success" },
        { id: 3, type: "Sign Up", date: "Dec 20, 2025", device: "Chrome / Windows", status: "Account Created" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <span className="text-accent text-sm font-medium uppercase tracking-widest">Workspace</span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-2">Welcome, {user.email.split('@')[0]}</h1>
                            <p className="text-muted-foreground mt-2">Manage your creative projects and studio settings.</p>
                        </div>
                        <div className="flex gap-3">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="gap-2 rounded-xl">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="sm:max-w-lg overflow-y-auto px-8 py-10">
                                    <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-8 sticky top-0 bg-background/80 backdrop-blur-md z-10 -mx-8 px-8 border-b border-border/10">
                                        <div className="pr-12">
                                            <SheetTitle className="text-2xl font-bold">Studio Settings</SheetTitle>
                                            <SheetDescription className="mt-1">
                                                Configure your workspace preferences and account security.
                                            </SheetDescription>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-accent hover:bg-accent/90 px-6 rounded-xl h-9 font-semibold"
                                            onClick={handleSaveChanges}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? "Saving..." : "Save"}
                                        </Button>
                                    </SheetHeader>

                                    <div className="space-y-10 mt-10">
                                        {/* Profile Section */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Profile</h4>
                                            <div className="grid gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name">Display Name</Label>
                                                    <Input
                                                        id="name"
                                                        value={displayName}
                                                        onChange={(e) => setDisplayName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <Input id="email" defaultValue={user.email} disabled />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Notifications Section */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Notifications</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label>Project Updates</Label>
                                                        <p className="text-xs text-muted-foreground">Receive emails when assets are added.</p>
                                                    </div>
                                                    <Switch
                                                        checked={projectUpdates}
                                                        onCheckedChange={setProjectUpdates}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label>Security Alerts</Label>
                                                        <p className="text-xs text-muted-foreground">Important account activity notifications.</p>
                                                    </div>
                                                    <Switch
                                                        checked={securityAlerts}
                                                        onCheckedChange={setSecurityAlerts}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Security Section */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Security</h4>
                                            <Button variant="outline" className="w-full justify-start gap-2 h-12">
                                                <ShieldCheck className="w-4 h-4" />
                                                Two-Factor Authentication
                                            </Button>
                                            <Button variant="outline" className="w-full justify-start gap-2 h-12">
                                                <Settings className="w-4 h-4" />
                                                Change Password
                                            </Button>
                                        </div>

                                        <Separator />

                                        {/* Connected Accounts */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Connected Accounts</h4>
                                            <div className="flex items-center justify-between p-3 rounded-xl border border-border/10 bg-accent/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border shadow-sm">
                                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Google</p>
                                                        <p className="text-[10px] text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-rose-500 text-[10px] h-7 px-2 hover:bg-rose-500/5">Disconnect</Button>
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Danger Zone */}
                                        <div className="space-y-4 pb-8">
                                            <h4 className="text-sm font-medium uppercase tracking-wider text-rose-500">Danger Zone</h4>
                                            <Button variant="ghost" className="w-full justify-start gap-2 h-12 text-rose-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                                Delete Account
                                            </Button>
                                        </div>

                                        <div className="pt-2">
                                            <Button
                                                className="w-full bg-accent hover:bg-accent/90 h-12 rounded-xl text-lg font-bold shadow-lg shadow-accent/20"
                                                onClick={handleSaveChanges}
                                                disabled={isSaving}
                                            >
                                                {isSaving ? "Saving..." : "Save All Changes"}
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <Button variant="accent" className="gap-2 rounded-xl">
                                <Plus className="w-4 h-4" />
                                New Project
                            </Button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Sidebar / Profile Card */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="glass-card p-8 text-center animate-fade-up">
                                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                                    <User className="w-12 h-12 text-accent" />
                                </div>
                                <h2 className="text-xl font-bold">{user.email}</h2>
                                <p className="text-sm text-muted-foreground mt-1 underline">
                                    {user.email === "arrows.suhail@gmail.com" ? "Admin" : "Creative Partner"}
                                </p>
                                <div className="mt-8 pt-8 border-t border-border/50">
                                    <Button variant="ghost" onClick={logout} className="w-full gap-2 text-rose-500 hover:text-rose-500 hover:bg-rose-500/5">
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </Button>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 gap-4">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="glass-card p-6 flex items-center justify-between animate-fade-up" style={{ animationDelay: '0.1s' }}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl bg-background border border-border/50 ${stat.color}`}>
                                                <stat.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                                <p className="text-xl font-bold font-mono">{stat.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Dashboard Area */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Recent Projects Section */}
                            <div className="glass-card p-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-bold">Recent Projects</h3>
                                    <Button variant="link" className="text-accent p-0 h-auto">View all</Button>
                                </div>

                                <div className="space-y-4">
                                    {recentProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="group flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/10 hover:border-accent/40 transition-all duration-300 cursor-pointer"
                                            onClick={() => navigate(project.path)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                                                    <LayoutDashboard className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold group-hover:text-accent transition-colors">{project.name}</h4>
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                                                        {project.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions / Integration Support */}
                            <div className="grid md:grid-cols-2 gap-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                                <div
                                    className="glass-card p-8 bg-gradient-to-br from-violet-500/10 to-transparent border-violet-500/20 cursor-pointer group hover:border-violet-500/40 transition-all"
                                    onClick={() => navigate("/payments")}
                                >
                                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-violet-400 transition-colors">
                                        Billing & Subscription
                                        <CreditCard className="w-5 h-5 text-violet-400" />
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        Manage your studio plans, payment methods, and billing history.
                                    </p>
                                    <Button variant="outline" className="w-full border-border/50 rounded-xl group-hover:bg-violet-500/10">Manage Payments</Button>
                                </div>

                                <div className="glass-card p-8 bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
                                    <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                                        Tutorials
                                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                        Learn how to leverage Arrows.in custom tools for your next project.
                                    </p>
                                    <Button variant="outline" className="w-full border-border/50 rounded-xl hover:bg-amber-500/10">Read Docs</Button>
                                </div>
                            </div>

                            {/* Activity History Section */}
                            <div className="glass-card p-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Security & Activity</h3>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-border/50 uppercase text-[10px] tracking-widest text-muted-foreground">
                                                <th className="pb-4 font-medium">Activity</th>
                                                <th className="pb-4 font-medium">Date & Time</th>
                                                <th className="pb-4 font-medium">Device / OS</th>
                                                <th className="pb-4 font-medium text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/10">
                                            {activityHistory.map((activity) => (
                                                <tr key={activity.id} className="group hover:bg-white/5 transition-colors">
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-3">
                                                            <History className="w-4 h-4 text-accent" />
                                                            <span className="font-medium text-sm">{activity.type}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-sm text-muted-foreground">{activity.date}</td>
                                                    <td className="py-4 text-sm text-muted-foreground">{activity.device}</td>
                                                    <td className="py-4 text-right">
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold tracking-tight">
                                                            {activity.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Admin-only User Management */}
                            {user.email === "arrows.suhail@gmail.com" && (
                                <div className="glass-card p-8 animate-fade-up border-accent/20 bg-accent/5" style={{ animationDelay: '0.5s' }}>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">User Management</h3>
                                            <p className="text-xs text-muted-foreground mt-1">Admin view of all registered studio accounts</p>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-border/50 uppercase text-[10px] tracking-widest text-muted-foreground">
                                                    <th className="pb-4 font-medium">Name</th>
                                                    <th className="pb-4 font-medium">Email</th>
                                                    <th className="pb-4 font-medium">Password (Secure View)</th>
                                                    <th className="pb-4 font-medium text-right">Joined</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border/10">
                                                {(() => {
                                                    const { getAllUsers } = useAuth();
                                                    const users = getAllUsers();
                                                    if (users.length === 0) {
                                                        return (
                                                            <tr>
                                                                <td colSpan={4} className="py-8 text-center text-muted-foreground italic">No registered users yet.</td>
                                                            </tr>
                                                        );
                                                    }
                                                    return users.map((u: any, idx: number) => (
                                                        <tr key={idx} className="group hover:bg-white/5 transition-colors">
                                                            <td className="py-4">
                                                                <span className="font-medium text-sm">{u.name}</span>
                                                            </td>
                                                            <td className="py-4 text-sm text-muted-foreground">{u.email}</td>
                                                            <td className="py-4 font-mono text-xs text-muted-foreground">
                                                                •••••••• <span className="text-[8px] ml-1 bg-white/10 px-1 rounded hover:text-white cursor-help" title={u.password}>(Hover to reveal: {u.password})</span>
                                                            </td>
                                                            <td className="py-4 text-right text-[10px] text-muted-foreground">
                                                                {u.registeredAt ? new Date(u.registeredAt).toLocaleDateString() : "N/A"}
                                                            </td>
                                                        </tr>
                                                    ));
                                                })()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

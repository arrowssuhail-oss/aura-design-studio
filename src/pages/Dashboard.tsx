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
    CreditCard,
    Camera,
    Upload,
    Palette
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/storage";
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

import { iconMap, defaultProjects } from "@/components/ProjectsSection";
import { defaultPageContent, ProjectPageData } from "@/components/projectData";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [displayName, setDisplayName] = useState(user?.name || user?.email.split('@')[0] || "");
    const [isSaving, setIsSaving] = useState(false);
    const [projectUpdates, setProjectUpdates] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);

    // Project Management
    const [projects, setProjects] = useState<any[]>([]);
    const [editingProject, setEditingProject] = useState<any | null>(null);
    const [isProjectSheetOpen, setIsProjectSheetOpen] = useState(false);

    // Story Management
    const [storyUrl, setStoryUrl] = useState("");
    const [activeStory, setActiveStory] = useState<{ content: string; active: boolean; timestamp: number } | null>(null);
    const [archive, setArchive] = useState<any[]>([]);

    // Page Content CMS State
    const [editingPageContent, setEditingPageContent] = useState<ProjectPageData | null>(null);
    const [activePageId, setActivePageId] = useState<number | null>(null);
    const [isPageContentSheetOpen, setIsPageContentSheetOpen] = useState(false);

    // Load initial story state & Archive
    useState(() => {
        // Load Archive
        const storedArchive = localStorage.getItem("arrows_story_archive");
        if (storedArchive) {
            setArchive(JSON.parse(storedArchive));
        }

        // Load Active Story
        const stored = localStorage.getItem("arrows_story_data");
        if (stored) {
            const parsed = JSON.parse(stored);

            // Auto Archive if expired (> 24h)
            const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;

            if (parsed.active && !isExpired) {
                setActiveStory(parsed);
                setStoryUrl(parsed.content);
            } else if (parsed.active && isExpired) {
                // Move to archive
                const newArchive = [parsed, ...(storedArchive ? JSON.parse(storedArchive) : [])];
                localStorage.setItem("arrows_story_archive", JSON.stringify(newArchive));
                setArchive(newArchive);

                // Deactivate current
                localStorage.removeItem("arrows_story_data");
                setActiveStory(null);
                setStoryUrl("");

                toast({ title: "Story Archived", description: "Previous story expired and moved to archive." });
            }
        }
    });

    // Load Projects
    useState(() => {
        const storedProjects = localStorage.getItem("arrows_projects_data");
        if (storedProjects) {
            try {
                setProjects(JSON.parse(storedProjects));
            } catch (e) {
                console.error("Failed to parse projects", e);
            }
        } else {
            setProjects(defaultProjects);
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        let file: File | undefined;

        if ((e as React.DragEvent).dataTransfer) {
            e.preventDefault();
            file = (e as React.DragEvent).dataTransfer.files[0];
        } else if ((e as React.ChangeEvent<HTMLInputElement>).target) {
            file = (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0];
        }

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast({ title: "File too large", description: "Please use an image under 5MB for this demo.", variant: "destructive" });
                return;
            }

            if (!file.type.startsWith('image/')) {
                toast({ title: "Invalid file", description: "Please upload an image file.", variant: "destructive" });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setStoryUrl(reader.result as string);
                toast({ title: "Image Loaded", description: "Click Update Story to save changes." });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleUpdateStory = async () => {
        if (!storyUrl) return;

        const storyData = {
            content: storyUrl,
            type: 'image' as const,
            timestamp: Date.now(),
            active: true
        };

        try {
            // Local update
            localStorage.setItem("arrows_story_data", JSON.stringify(storyData));

            // GitHub Sync
            toast({ title: "Syncing Story...", description: "Uploading to GitHub." });
            const response = await fetch('http://localhost:3001/api/sync-github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: { heroImage: storyUrl }, pageId: 'story' }) // Hack to reuse image processing
            });

            const result = await response.json();
            if (result.success) {
                toast({ title: "Story Live!", description: "Updated and pushed to GitHub." });
            }

            window.location.reload();
        } catch (error) {
            console.error("Story update failed", error);
        }
    };

    const handleArchiveStory = () => {
        if (!activeStory) return;

        const newArchive = [activeStory, ...archive];
        setArchive(newArchive);
        localStorage.setItem("arrows_story_archive", JSON.stringify(newArchive));

        // Clear active story without deleting distinct properties if I were to keep them, but here we just clear.
        localStorage.removeItem("arrows_story_data");
        setActiveStory(null);
        setStoryUrl("");

        toast({ title: "Story Archived", description: "Story moved to archive." });
    };

    const handleDeleteStory = () => {
        localStorage.removeItem("arrows_story_data");
        setActiveStory(null);
        setStoryUrl("");
        toast({ title: "Story Removed", description: "The story has been removed." });
    };

    // Project Handlers
    const handleSaveProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // 1. Prepare data
            const projectId = editingProject.id || Date.now();
            const projectToSave = { ...editingProject, id: projectId };

            // 2. Sync to GitHub (Automatic Upload)
            toast({ title: "Syncing Project...", description: "Uploading assets to GitHub." });
            const response = await fetch('http://localhost:3001/api/sync-github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: { heroImage: projectToSave.image }, // Reuse logic to save single image
                    pageId: `project_${projectId}`
                })
            });

            const result = await response.json();
            if (result.success) {
                // Update image path with synced one
                projectToSave.image = result.updatedContent.heroImage;

                const updatedProjects = editingProject.id
                    ? projects.map(p => p.id === editingProject.id ? projectToSave : p)
                    : [...projects, projectToSave];

                // 3. Sync Full Project List to GitHub
                await fetch('http://localhost:3001/api/sync-github', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: updatedProjects, pageId: 'main_projects' })
                });

                setProjects(updatedProjects);
                localStorage.setItem("arrows_projects_data", JSON.stringify(updatedProjects)); // Changed to arrows_projects_data
                window.dispatchEvent(new Event("project-update")); // Notify other components
                setIsProjectSheetOpen(false);
                setEditingProject(null); // Clear editing project
                toast({ title: "Sync Complete", description: "Project list and image are on GitHub!" });
            } else {
                throw new Error(result.error || "Unknown error during sync.");
            }
        } catch (error) {
            console.error("Project sync failed", error);
            toast({ variant: "destructive", title: "Sync Failed", description: "Check server connection or storage." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteProject = (id: number) => {
        const updatedProjects = projects.filter(p => p.id !== id);
        setProjects(updatedProjects);
        localStorage.setItem("arrows_projects_data", JSON.stringify(updatedProjects));
        window.dispatchEvent(new Event("project-update"));
        toast({ title: "Deleted", description: "Project has been removed." });
    };

    const handleEditPageContent = async (id: number) => {
        try {
            const storedContent = await db.getItem<ProjectPageData>(`arrows_page_content_${id}`);
            if (storedContent) {
                setEditingPageContent(storedContent);
            } else {
                setEditingPageContent(defaultPageContent[id] || null);
            }
            setActivePageId(id);
            setIsPageContentSheetOpen(true);
        } catch (error) {
            console.error("Failed to load page content", error);
            // Fallback to default if error
            setEditingPageContent(defaultPageContent[id] || null);
            setActivePageId(id);
            setIsPageContentSheetOpen(true);
        }
    };

    const handleSavePageContent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activePageId || !editingPageContent) return;

        try {
            // 1. Local State Update
            await db.setItem(`arrows_page_content_${activePageId}`, editingPageContent);

            // 2. GitHub Sync (Automatic Upload)
            toast({ title: "Syncing...", description: "Uploading assets and pushing to GitHub." });
            const response = await fetch('http://localhost:3001/api/sync-github', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: editingPageContent, pageId: activePageId })
            });

            const result = await response.json();
            if (result.success) {
                // Update local storage with the new file paths (instead of base64)
                await db.setItem(`arrows_page_content_${activePageId}`, result.updatedContent);
                setEditingPageContent(result.updatedContent);
                toast({ title: "Sync Complete", description: "All changes are on GitHub!" });
            } else {
                throw new Error(result.error);
            }

            window.dispatchEvent(new Event(`page-content-update-${activePageId}`));
            setIsPageContentSheetOpen(false);
        } catch (error) {
            console.error("Failed to save content:", error);
            toast({
                variant: "destructive",
                title: "Save Failed",
                description: "Storage quota exceeded or error occurred."
            });
        }
    };

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
        { id: 1, name: "Web Design - Antigravity", status: "Published", path: "/projects/webdesign" },
        { id: 2, name: "Video Editing Portfolio", status: "Active", path: "/projects/video-editing" },
        { id: 3, name: "Identity - Graphic Design", status: "Published", path: "/projects/identity" },
        { id: 4, name: "Human Centered Design (UX)", status: "Active", path: "/projects/ui-ux-design" },
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
                            <Button
                                variant="accent"
                                className="gap-2 rounded-xl"
                                onClick={() => {
                                    setEditingProject({
                                        title: "",
                                        category: "",
                                        link: "/",
                                        iconName: "Palette",
                                        color: "from-gray-500/30 to-gray-500/5",
                                        shapes: ["rounded-full", "rounded-lg", "rounded-full"]
                                    });
                                    setIsProjectSheetOpen(true);
                                }}
                            >
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
                            {/* Story Management Section */}
                            <div className="glass-card p-8 animate-fade-up mb-8" style={{ animationDelay: '0.15s' }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500">
                                        <Camera className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">Story Management</h3>
                                        <p className="text-sm text-muted-foreground mt-1">Update the daily story visible to everyone on the Navbar.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-4">
                                            <Label htmlFor="story-url">Image Source</Label>

                                            {/* Drop Zone */}
                                            <div
                                                className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:bg-accent/5 hover:border-accent/50 transition-colors cursor-pointer relative"
                                                onDrop={handleFileChange}
                                                onDragOver={handleDragOver}
                                                onClick={() => document.getElementById('file-upload')?.click()}
                                            >
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                                                <p className="text-sm font-medium">Click or Drag & Drop to Upload</p>
                                                <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG (Max 5MB)</p>
                                            </div>

                                            <div className="relative">
                                                <div className="absolute inset-0 flex items-center">
                                                    <span className="w-full border-t border-border/50" />
                                                </div>
                                                <div className="relative flex justify-center text-xs uppercase">
                                                    <span className="bg-background px-2 text-muted-foreground">Or use URL</span>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <Input
                                                    id="story-url"
                                                    placeholder="https://example.com/story-image.jpg"
                                                    value={storyUrl.length > 100 ? "(Image Data Loaded)" : storyUrl}
                                                    onChange={(e) => setStoryUrl(e.target.value)}
                                                />
                                                <p className="text-xs text-muted-foreground">Enter a direct link or use the upload above.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button onClick={handleUpdateStory} className="bg-pink-600 hover:bg-pink-700">
                                                Update Story
                                            </Button>
                                            {activeStory && (
                                                <>
                                                    <Button variant="outline" onClick={handleArchiveStory} className="text-indigo-500 hover:text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                                        <History className="w-4 h-4 mr-2" />
                                                        Archive
                                                    </Button>
                                                    <Button variant="outline" onClick={handleDeleteStory} className="text-rose-500 hover:text-rose-600 border-rose-200 hover:bg-rose-50">
                                                        Remove
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {activeStory && (
                                    <div className="w-full md:w-32 flex flex-col items-center gap-2">
                                        <span className="text-xs font-medium text-muted-foreground">Current Story</span>
                                        <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600">
                                            <div className="w-full h-full rounded-full border-2 border-background overflow-hidden relative group cursor-pointer">
                                                <img src={activeStory.content} alt="Current Story" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">Active</span>
                                    </div>
                                )}
                            </div>



                            {/* Archive Section */}
                            {archive.length > 0 && (
                                <div className="glass-card p-8 animate-fade-up mb-8" style={{ animationDelay: '0.2s' }}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                                            <History className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Story Archive</h3>
                                            <p className="text-sm text-muted-foreground mt-1">Past stories (automatically archived after 24h).</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {archive.map((story: any, idx: number) => (
                                            <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-border/50">
                                                <img src={story.content} alt="Archived Story" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                                    <span className="text-[10px] text-white/80">Posted</span>
                                                    <span className="text-xs font-medium text-white">
                                                        {new Date(story.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                    </span>
                                                    <span className="text-[10px] text-white/60">
                                                        {new Date(story.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Portfolio Management Section */}
                            <div className="glass-card p-8 animate-fade-up mb-8" style={{ animationDelay: '0.25s' }}>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                            <Palette className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">Portfolio Management</h3>
                                            <p className="text-sm text-muted-foreground mt-1">Update the projects displayed on the main landing page.</p>
                                        </div>
                                    </div>
                                    <Button onClick={() => {
                                        setEditingProject({
                                            title: "",
                                            category: "",
                                            link: "/",
                                            iconName: "Palette",
                                            color: "from-gray-500/30 to-gray-500/5",
                                            shapes: ["rounded-full", "rounded-lg", "rounded-full"]
                                        });
                                        setIsProjectSheetOpen(true);
                                    }} className="gap-2">
                                        <Plus className="w-4 h-4" /> Add Project
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="group flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/10 hover:border-accent/40 transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                                                    <LayoutDashboard className="w-6 h-6 text-white/70" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold group-hover:text-accent transition-colors">{project.title}</h4>
                                                    <span className="text-xs text-muted-foreground">{project.category}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {defaultPageContent[project.id] && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
                                                        onClick={() => handleEditPageContent(project.id)}
                                                    >
                                                        Edit Page
                                                    </Button>
                                                )}
                                                <Button variant="ghost" size="sm" onClick={() => {
                                                    setEditingProject(project);
                                                    setIsProjectSheetOpen(true);
                                                }}>Edit</Button>
                                                <Button variant="ghost" size="icon" className="text-rose-500 hover:bg-rose-500/10" onClick={() => handleDeleteProject(project.id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Edit Project Sheet */}
                            <Sheet open={isProjectSheetOpen} onOpenChange={setIsProjectSheetOpen}>
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>{editingProject?.id ? 'Edit Project' : 'Add New Project'}</SheetTitle>
                                        <SheetDescription>
                                            Changes will be reflected on the main page immediately.
                                        </SheetDescription>
                                    </SheetHeader>
                                    {editingProject && (
                                        <form onSubmit={handleSaveProject} className="space-y-6 mt-8">
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input
                                                    value={editingProject.title}
                                                    onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Category</Label>
                                                <Input
                                                    value={editingProject.category}
                                                    onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Link Path</Label>
                                                <Input
                                                    value={editingProject.link}
                                                    onChange={e => setEditingProject({ ...editingProject, link: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Icon</Label>
                                                <select
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={editingProject.iconName}
                                                    onChange={e => setEditingProject({ ...editingProject, iconName: e.target.value })}
                                                >
                                                    {Object.keys(iconMap).map(key => (
                                                        <option key={key} value={key}>{key}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Color Gradient (Tailwind Classes)</Label>
                                                <Input
                                                    value={editingProject.color}
                                                    onChange={e => setEditingProject({ ...editingProject, color: e.target.value })}
                                                    placeholder="from-rose-500/30 to-rose-500/5"
                                                />
                                            </div>

                                            {/* Project Cover Image */}
                                            <div className="space-y-2">
                                                <Label>Project Cover Image (Slideshow/Card)</Label>
                                                <div className="flex flex-col gap-3">
                                                    <Input
                                                        value={editingProject.image || ""}
                                                        onChange={e => setEditingProject({ ...editingProject, image: e.target.value })}
                                                        placeholder="https://... (URL)"
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <div className="relative flex-1">
                                                            <Input
                                                                type="file"
                                                                accept="image/*"
                                                                className="cursor-pointer"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        const reader = new FileReader();
                                                                        reader.onloadend = () => {
                                                                            setEditingProject({ ...editingProject, image: reader.result as string });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-muted-foreground whitespace-nowrap">Upload Image</span>
                                                    </div>
                                                </div>
                                                {editingProject.image && (
                                                    <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-border/10">
                                                        <img src={editingProject.image} alt="Preview" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                            </div>

                                            <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isSaving}>
                                                {isSaving ? "Saving & Syncing..." : "Save Project"}
                                            </Button>
                                        </form>
                                    )}
                                </SheetContent>
                            </Sheet>

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

                {/* Page Content Editor Sheet */}
                <Sheet open={isPageContentSheetOpen} onOpenChange={setIsPageContentSheetOpen}>
                    <SheetContent className="overflow-y-auto sm:max-w-xl">
                        <SheetHeader>
                            <SheetTitle>Edit Page Content</SheetTitle>
                            <SheetDescription>
                                Customize the text and details of the project page.
                            </SheetDescription>
                        </SheetHeader>
                        {editingPageContent && (
                            <form onSubmit={handleSavePageContent} className="space-y-6 mt-6">
                                {/* Hero Section */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold border-b pb-2">Hero Section</h4>
                                    <div className="space-y-2">
                                        <Label>Hero Title</Label>
                                        <Input
                                            value={editingPageContent.heroTitle}
                                            onChange={e => setEditingPageContent({ ...editingPageContent, heroTitle: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Hero Description</Label>
                                        <Input
                                            value={editingPageContent.heroDescription}
                                            onChange={e => setEditingPageContent({ ...editingPageContent, heroDescription: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Hero Image</Label>
                                        <div className="flex flex-col gap-3">
                                            <Input
                                                value={editingPageContent.heroImage || ""}
                                                onChange={e => setEditingPageContent({ ...editingPageContent, heroImage: e.target.value })}
                                                placeholder="https://... (URL)"
                                            />
                                            <div className="flex items-center gap-2">
                                                <div className="relative flex-1">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        className="cursor-pointer"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                if (file.size > 500 * 1024 * 1024) {
                                                                    toast({
                                                                        variant: "destructive",
                                                                        title: "File too large",
                                                                        description: "Image must be under 500MB."
                                                                    });
                                                                    return;
                                                                }
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setEditingPageContent({ ...editingPageContent, heroImage: reader.result as string });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">OR Upload File</span>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground">Top limit 500MB. Note: Browser storage limits (usually ~5MB) may prevent saving very large files.</p>
                                    </div>
                                </div>

                                {/* Gallery Section */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold border-b pb-2">Project Gallery</h4>

                                    {/* Gallery Grid */}
                                    {editingPageContent.gallery && editingPageContent.gallery.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2">
                                            {editingPageContent.gallery.map((img, idx) => (
                                                <div key={idx} className="relative group aspect-video bg-muted rounded-md overflow-hidden">
                                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newGallery = [...(editingPageContent.gallery || [])];
                                                            newGallery.splice(idx, 1);
                                                            setEditingPageContent({ ...editingPageContent, gallery: newGallery });
                                                        }}
                                                        className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Add Image Controls */}
                                    <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
                                        <Label>Add New Image</Label>

                                        {/* File Upload */}
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    className="cursor-pointer"
                                                    key={editingPageContent.gallery?.length}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            if (file.size > 500 * 1024 * 1024) {
                                                                toast({ variant: "destructive", title: "File too large", description: "Limit is 500MB" });
                                                                return;
                                                            }
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                const newGallery = [...(editingPageContent.gallery || []), reader.result as string];
                                                                setEditingPageContent({ ...editingPageContent, gallery: newGallery });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">Upload</span>
                                        </div>

                                        <div className="text-center text-xs text-muted-foreground">- OR -</div>

                                        {/* URL Input */}
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Image URL..."
                                                id="gallery-url-input"
                                            />
                                            <Button type="button" size="sm" variant="outline" onClick={() => {
                                                const input = document.getElementById('gallery-url-input') as HTMLInputElement;
                                                if (input && input.value) {
                                                    const newGallery = [...(editingPageContent.gallery || []), input.value];
                                                    setEditingPageContent({ ...editingPageContent, gallery: newGallery });
                                                    input.value = "";
                                                }
                                            }}>
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Challenge & Solution */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold border-b pb-2">Case Study Details</h4>
                                    <div className="space-y-2">
                                        <Label>The Challenge</Label>
                                        <textarea
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={editingPageContent.challenge}
                                            onChange={e => setEditingPageContent({ ...editingPageContent, challenge: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>The Solution</Label>
                                        <textarea
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={editingPageContent.solution}
                                            onChange={e => setEditingPageContent({ ...editingPageContent, solution: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold border-b pb-2">Project Metadata</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Role</Label>
                                            <Input
                                                value={editingPageContent.role}
                                                onChange={e => setEditingPageContent({ ...editingPageContent, role: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Timeline</Label>
                                            <Input
                                                value={editingPageContent.timeline}
                                                onChange={e => setEditingPageContent({ ...editingPageContent, timeline: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Tools</Label>
                                            <Input
                                                value={editingPageContent.tools}
                                                onChange={e => setEditingPageContent({ ...editingPageContent, tools: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Year</Label>
                                            <Input
                                                value={editingPageContent.year}
                                                onChange={e => setEditingPageContent({ ...editingPageContent, year: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold border-b pb-2">Key Features</h4>
                                    <div className="space-y-2">
                                        <Label>Features List (One per line)</Label>
                                        <textarea
                                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={editingPageContent.features?.join('\n')}
                                            onChange={e => setEditingPageContent({ ...editingPageContent, features: e.target.value.split('\n') })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <Button type="button" variant="outline" onClick={() => setIsPageContentSheetOpen(false)} className="flex-1">Cancel</Button>
                                    <Button type="submit" variant="accent" className="flex-1">Save Page Content</Button>
                                </div>
                            </form>
                        )}
                    </SheetContent>
                </Sheet>
            </main >

            <Footer />
        </div >
    );
}

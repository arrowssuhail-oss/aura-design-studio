import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    CreditCard,
    Check,
    ChevronRight,
    History,
    ArrowLeft,
    ShieldCheck,
    Zap,
    Download,
    Lock,
    QrCode,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export default function Payments() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedPlan, setSelectedPlan] = useState<string>("studio");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentStep, setPaymentStep] = useState<"qr" | "processing" | "success">("qr");

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleInitiatePayment = (planId: string) => {
        setSelectedPlan(planId);
        setIsPaymentModalOpen(true);
        setPaymentStep("qr");
    };

    const simulatePayment = () => {
        setPaymentStep("processing");
        setTimeout(() => {
            setPaymentStep("success");
            toast({
                title: "Payment Successful",
                description: "Your transaction has been processed and your asset is ready for download.",
            });
        }, 3000);
    };

    const handleDownload = () => {
        toast({
            title: "Download Started",
            description: "Preparing your high-resolution studio assets...",
        });
    };

    const plans = [
        {
            id: "pro",
            name: "Pro",
            price: "$29",
            description: "Perfect for independent creators",
            features: ["5 Active Projects", "10GB Storage", "Basic Assets", "Email Support"],
            icon: Zap,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            id: "studio",
            name: "Studio",
            price: "$99",
            description: "For growing design teams",
            features: ["Unlimited Projects", "100GB Storage", "Premium Assets", "Priority Support", "Custom Branding"],
            icon: ShieldCheck,
            color: "text-accent",
            bg: "bg-accent/10",
            popular: true
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: "Custom",
            description: "Scale your creative operations",
            features: ["Unlimited Everything", "SSO/SAML", "Dedicated Support", "API Access"],
            icon: Lock,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        }
    ];

    const transactions = [
        { id: "INV-2025-001", date: "Dec 20, 2025", amount: "$99.00", status: "Paid" },
        { id: "INV-2025-002", date: "Nov 20, 2025", amount: "$99.00", status: "Paid" },
        { id: "INV-2025-003", date: "Oct 20, 2025", amount: "$99.00", status: "Paid" }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <span className="text-accent text-sm font-medium uppercase tracking-widest">Billing & Subscription</span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-2">Manage Studio Access</h1>
                            <p className="text-muted-foreground mt-2">Choose the right plan for your creative needs.</p>
                        </div>
                    </div>


                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Payment Method */}
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-accent" />
                                Payment Method
                            </h3>

                            <div className="p-6 rounded-2xl bg-background/50 border border-border/10 flex items-center justify-between mb-8 group hover:border-white/20 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                                        <div className="w-24 bg-gradient-to-r from-blue-600 to-indigo-600 py-1 text-[8px] font-black italic text-center text-white relative rotate-12 -translate-y-1">
                                            VISA
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold">•••• •••• •••• 4242</p>
                                        <p className="text-xs text-muted-foreground">Expires 12/28</p>
                                    </div>
                                </div>
                                <Button variant="ghost" className="text-accent underline">Edit</Button>
                            </div>

                            <Button variant="outline" className="w-full h-12 rounded-xl border-dashed border-border/50 hover:border-accent hover:bg-accent/5 transition-all">
                                + Add New Payment Method
                            </Button>
                        </div>

                        {/* Recent Transactions */}
                        <div className="glass-card p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <History className="w-6 h-6 text-accent" />
                                    Billing History
                                </h3>
                                <Button variant="link" className="text-accent p-0">Receipts</Button>
                            </div>

                            <div className="space-y-2">
                                {transactions.map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all group">
                                        <div>
                                            <p className="text-sm font-medium">{tx.id}</p>
                                            <p className="text-xs text-muted-foreground">{tx.date}</p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-sm font-bold">{tx.amount}</p>
                                                <span className="text-[10px] text-emerald-500 font-bold tracking-tight uppercase">
                                                    {tx.status}
                                                </span>
                                            </div>
                                            <button className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent/20">
                                                <Download className="w-4 h-4 text-accent" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Razorpay Simulation Modal */}
                    <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                        <DialogContent className="sm:max-w-[400px] bg-slate-50 text-slate-900 overflow-hidden border-none p-0">
                            <div className="bg-[#1e2752] p-6 text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-lg">A</div>
                                    <div>
                                        <p className="text-xs opacity-70">Paying to</p>
                                        <p className="font-bold">Aura Design Studio</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs opacity-70">Amount</p>
                                    <p className="font-bold">{plans.find(p => p.id === selectedPlan)?.price || "$99"}</p>
                                </div>
                            </div>

                            <div className="p-8">
                                {paymentStep === "qr" && (
                                    <div className="text-center animate-fade-in">
                                        <div className="mb-6 flex justify-center">
                                            <div className="bg-white p-2 rounded-xl shadow-xl border-2 border-slate-100 overflow-hidden">
                                                <img
                                                    src="/qr-code.png"
                                                    alt="Razorpay QR"
                                                    className="w-48 h-48 object-cover"
                                                />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Scan to Pay with UPI</h3>
                                        <p className="text-sm text-slate-500 mb-8">Open any UPI app like GPay, PhonePe or Paytm to scan</p>

                                        <div className="space-y-3">
                                            <Button
                                                className="w-full bg-[#1e2752] hover:bg-[#2a366e] text-white h-12 rounded-xl"
                                                onClick={simulatePayment}
                                            >
                                                Simulate Payment Complete
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="w-full text-slate-400 text-xs"
                                                onClick={() => setIsPaymentModalOpen(false)}
                                            >
                                                Cancel Transaction
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {paymentStep === "processing" && (
                                    <div className="text-center py-12 animate-pulse">
                                        <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-spin" />
                                        <h3 className="text-xl font-bold mb-2">Verifying Payment...</h3>
                                        <p className="text-sm text-slate-500">Please do not close this window</p>
                                    </div>
                                )}

                                {paymentStep === "success" && (
                                    <div className="text-center animate-fade-up">
                                        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h3>
                                        <p className="text-sm text-slate-500 mb-8">Your asset is now unlocked and ready.</p>

                                        <Button
                                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12 rounded-xl flex items-center justify-center gap-2 text-lg font-bold"
                                            onClick={() => {
                                                handleDownload();
                                                setIsPaymentModalOpen(false);
                                            }}
                                        >
                                            <Download className="w-5 h-5" />
                                            Download Asset Now
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-100 p-4 text-center">
                                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                                    <ShieldCheck className="w-3 h-3" />
                                    Secured by Razorpay
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </main>

            <Footer />
        </div>
    );
}

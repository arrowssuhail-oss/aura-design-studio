import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    CreditCard,
    History,
    ArrowLeft,
    ShieldCheck,
    Download,
    Lock,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import ReceiptModal from "@/components/ReceiptModal";

export default function Payments() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedPlan, setSelectedPlan] = useState<string>("studio");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentStep, setPaymentStep] = useState<"qr" | "processing" | "success">("qr");
    const [viewingReceipt, setViewingReceipt] = useState<any | null>(null);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("aura_transactions");
        return saved ? JSON.parse(saved) : [
            { id: "INV-2025-001", date: "Dec 20, 2025", amount: "$99.00", status: "Paid", description: "Studio Plan - Monthly" },
            { id: "INV-2025-002", date: "Nov 20, 2025", amount: "$99.00", status: "Paid", description: "Studio Plan - Monthly" },
            { id: "INV-2025-003", date: "Oct 20, 2025", amount: "$99.00", status: "Paid", description: "Studio Plan - Monthly" }
        ];
    });

    if (!user) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-6 bg-gradient-to-b from-background to-accent/5">
                    <div className="glass-card p-12 text-center max-w-md animate-fade-up border-accent/20">
                        <Lock className="w-16 h-16 text-accent mx-auto mb-6" />
                        <h1 className="text-3xl font-bold mb-4">Login Required</h1>
                        <p className="text-muted-foreground mb-8">
                            Please sign in to manage your payments and download your premium assets.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Button variant="accent" onClick={() => navigate("/login")} className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-accent/20">
                                Sign In
                            </Button>
                            <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const handleInitiatePayment = (planId: string) => {
        setSelectedPlan(planId);
        setIsPaymentModalOpen(true);
        setPaymentStep("qr");
    };

    const addTransaction = (id: string, amount: string, description: string = "Premium Digital Asset Pack") => {
        const newTx = {
            id,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            amount,
            status: "Paid",
            description
        };
        const updated = [newTx, ...transactions];
        setTransactions(updated);
        localStorage.setItem("aura_transactions", JSON.stringify(updated));
    };

    const simulatePayment = () => {
        setPaymentStep("processing");
        setTimeout(() => {
            setPaymentStep("success");
            addTransaction(`SIM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, "INR 1.00", "Premium Digital Asset Pack");
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

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRazorpayPayment = async () => {
        const res = await loadRazorpay();

        if (!res) {
            toast({
                title: "Error",
                description: "Razorpay SDK failed to load. Please check your connection.",
                variant: "destructive",
            });
            return;
        }

        const options = {
            "key": import.meta.env.VITE_RAZORPAY_KEY_ID, // Use environment variable for Key ID
            "amount": "100", // Amount is in currency subunits. 100 = 1 INR
            "currency": "INR",
            "name": "Arrows Design",
            "description": "Payment for Assets",
            "image": "https://arrowsdesign.com/your_logo",
            "handler": function (response: any) {
                toast({
                    title: "Payment Successful",
                    description: `Payment ID: ${response.razorpay_payment_id}`,
                });
                addTransaction(response.razorpay_payment_id, "INR 1.00", "Premium Digital Asset Pack");
                setPaymentStep("success");
                setIsPaymentModalOpen(true);
            },
            "prefill": {
                "name": user?.name || "Test User",
                "email": user?.email || "test@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
    };

    const plans = [

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
                            <span className="text-accent text-sm font-medium uppercase tracking-widest">Payments & Billing</span>
                            <h1 className="text-4xl md:text-5xl font-bold mt-2">Manage Payments</h1>
                        </div>
                    </div>


                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Payment Method */}
                        <div className="glass-card p-6 h-fit">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <CreditCard className="w-6 h-6 text-accent" />
                                Payment Method
                            </h3>
                            <Button
                                onClick={handleRazorpayPayment}
                                className="w-full h-12 rounded-xl bg-[#3399cc] hover:bg-[#2b88b6] text-white transition-all font-bold flex items-center justify-center gap-2"
                            >
                                <img src="/razorpay-logo.png" alt="Razorpay" className="h-6 w-auto" />
                            </Button>
                        </div>

                        {/* Recent Transactions */}
                        <div className="glass-card p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <History className="w-6 h-6 text-accent" />
                                    Billing History
                                </h3>
                                <Button
                                    variant="link"
                                    className="text-accent p-0"
                                    onClick={() => {
                                        if (transactions.length > 0) {
                                            setViewingReceipt(transactions[0]);
                                            setIsReceiptModalOpen(true);
                                        } else {
                                            toast({ description: "No receipts available yet." });
                                        }
                                    }}
                                >
                                    Receipts
                                </Button>
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
                                            <button
                                                onClick={() => {
                                                    setViewingReceipt(tx);
                                                    setIsReceiptModalOpen(true);
                                                }}
                                                className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent/20"
                                                title="View Receipt"
                                            >
                                                <Download className="w-4 h-4 text-accent" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <ReceiptModal
                        isOpen={isReceiptModalOpen}
                        onClose={() => setIsReceiptModalOpen(false)}
                        transaction={viewingReceipt}
                        user={user}
                    />

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
                                    <p className="font-bold">{plans.find(p => p.id === selectedPlan)?.price || "INR 1"}</p>
                                </div>
                            </div>

                            <div className="p-8">
                                {paymentStep === "qr" && (
                                    <div className="text-center animate-fade-in">
                                        <div className="mb-6 flex justify-center">
                                            <div className="bg-white p-2 rounded-xl shadow-xl border-2 border-slate-100 overflow-hidden">
                                                <img
                                                    src="/qr-code.png"
                                                    alt="Razorpay QR: qr_RyWSmMCzM5LRYc"
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

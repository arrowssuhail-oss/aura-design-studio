import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";

interface Transaction {
    id: string;
    date: string;
    amount: string;

    status: string;
    description?: string;
}

interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
    user: any;
}

export default function ReceiptModal({ isOpen, onClose, transaction, user }: ReceiptModalProps) {
    if (!transaction) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl bg-white text-slate-900 p-0 overflow-hidden font-sans print:shadow-none print:border-none print:w-full print:max-w-full">
                <div className="p-8 print:p-0" id="receipt-content">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <img src="/logo.png" alt="Arrows Design" className="w-10 h-10 object-contain rounded-lg" />
                                <h2 className="text-2xl font-bold tracking-tight">Arrows Design</h2>
                            </div>
                            <p className="text-slate-500 text-sm max-w-xs">
                                Specializing in minimal, meaningful digital experiences and premium assets.
                            </p>
                        </div>
                        <div className="text-right">
                            <h1 className="text-4xl font-bold text-slate-200 uppercase tracking-widest mb-2">Receipt</h1>
                            <p className="font-mono text-slate-500">#{transaction.id}</p>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-12 mb-12">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Billed To</h3>
                            <p className="font-bold text-lg mb-1">{user?.name || "Valued Customer"}</p>
                            <p className="text-slate-500">{user?.email || "email@example.com"}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Date Issued</h3>
                                <p className="font-medium">{transaction.date}</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Amount</h3>
                                <p className="font-bold text-emerald-600">{transaction.amount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Line Items */}
                    <div className="mb-12">
                        <div className="border-b-2 border-slate-100 pb-4 mb-4 grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                            <div className="col-span-8">Description</div>
                            <div className="col-span-2 text-right">Qty</div>
                            <div className="col-span-2 text-right">Price</div>
                        </div>
                        <div className="border-b border-slate-50 pb-4 mb-4 grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-8">
                                <p className="font-bold text-slate-900">{transaction.description || "Premium Digital Asset Pack"}</p>
                                <p className="text-xs text-slate-500">License: Standard Commercial</p>
                            </div>
                            <div className="col-span-2 text-right font-mono text-slate-500">01</div>
                            <div className="col-span-2 text-right font-bold">{transaction.amount}</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end border-t-2 border-slate-100 pt-8">
                        <div className="text-sm text-slate-500">
                            <p className="font-bold text-slate-900 mb-1">Thank you for your business!</p>
                            <p>For any inquiries, please contact arrows.suhail@gmail.com</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Total</p>
                            <p className="text-3xl font-bold text-[#1e2752]">{transaction.amount}</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-slate-50 p-6 flex justify-end gap-3 print:hidden border-t border-slate-100">
                    <Button variant="outline" onClick={handlePrint} className="gap-2">
                        <Printer className="w-4 h-4" />
                        Print
                    </Button>
                    <Button onClick={handlePrint} className="gap-2 bg-[#1e2752] hover:bg-[#2a366e] text-white">
                        <Download className="w-4 h-4" />
                        Download PDF
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

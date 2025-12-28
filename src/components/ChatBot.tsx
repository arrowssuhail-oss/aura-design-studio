"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, X, Bot, Hammer } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Launcher Button */}
            <div className={cn(
                "fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out",
                isOpen ? "scale-0 rotate-90 opacity-0 pointer-events-none" : "scale-100 rotate-0 opacity-100"
            )}>
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-14 h-14 bg-primary shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
                >
                    <MessageCircle className="w-7 h-7" />
                </Button>
            </div>

            {/* Chat Window */}
            <div className={cn(
                "fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-48px)]",
                "bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none"
            )}>

                {/* Header */}
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm leading-none">Arrow AI</h3>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                <p className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">Maintenance</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-muted-foreground">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Under Development Content */}
                <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center animate-pulse">
                        <Hammer className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">Under Development</h4>
                        <p className="text-sm text-muted-foreground mt-2 max-w-[250px] mx-auto leading-relaxed">
                            We're currently upgrading Arrow AI to serve you better. Check back soon for even smarter design assistance.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Contact us meanwhile
                    </Button>
                </div>
            </div>
        </>
    );
}

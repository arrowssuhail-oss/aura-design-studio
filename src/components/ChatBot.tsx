"use client";

import { useChat } from '@ai-sdk/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Bot, User, RotateCcw } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown'; // Run: npm install react-markdown
import { useLocation, useNavigate } from "react-router-dom";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [input, setInput] = useState('');

    // Cast to any to bypass type mismatch issues with strict SDK types
    const { messages, isLoading, append, setMessages } = useChat({
        api: '/api/chat', // Ensure this matches your route
        onError: (error: any) => {
            console.error("Chat error:", error);
            toast.error("Connection lost. Please check your internet.");
        }
    } as any) as any;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const currentInput = input;
        setInput('');

        await append({
            role: 'user',
            content: currentInput
        });
    };

    // Auto-scroll to bottom on new messages and handle navigation tags
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];

            // Check for navigation tags in the response
            if (lastMessage.role === 'assistant') {
                const content = lastMessage.content;
                let targetSection = '';

                if (content.includes('[NAVIGATE:SKILLS]')) {
                    targetSection = 'skills';
                } else if (content.includes('[NAVIGATE:PROJECTS]')) {
                    targetSection = 'projects';
                } else if (content.includes('[NAVIGATE:CONTACT]')) {
                    targetSection = 'contact';
                }

                if (targetSection) {
                    if (location.pathname !== '/') {
                        navigate('/');
                        // Wait for navigation to complete before scrolling
                        setTimeout(() => {
                            const element = document.getElementById(targetSection);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 500);
                    } else {
                        const element = document.getElementById(targetSection);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }
            }
        }

        if (scrollRef.current) {
            // Short timeout to ensure content renders before scrolling
            setTimeout(() => {
                scrollRef.current?.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [messages, isLoading, location.pathname, navigate]);

    const clearChat = () => {
        setMessages([]);
        toast.success("Conversation cleared");
    };

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
                "fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-h-[85vh] max-w-[calc(100vw-48px)]",
                "bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl flex flex-col transition-all duration-300 origin-bottom-right",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none"
            )}>

                {/* Header */}
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm leading-none">Arrow AI</h3>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">Online Assistant</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={clearChat} title="Clear Chat" className="h-8 w-8 text-muted-foreground">
                            <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-muted-foreground">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea ref={scrollRef} className="flex-1 p-4">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-[300px] text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                                <Bot className="w-8 h-8 text-muted-foreground opacity-40" />
                            </div>
                            <h4 className="font-medium text-sm">How can I help you today?</h4>
                            <p className="text-xs text-muted-foreground max-w-[200px] mt-2 mb-6">
                                Ask about our design services, pricing, or current projects.
                            </p>
                            <div className="flex flex-col gap-2 w-full max-w-[250px]">
                                {[
                                    "What services do you offer?",
                                    "Tell me about your pricing.",
                                    "Show me recent projects."
                                ].map((question, i) => (
                                    <Button
                                        key={i}
                                        variant="outline"
                                        className="h-auto py-2 text-xs font-normal justify-start text-muted-foreground hover:text-foreground text-left"
                                        onClick={async () => {
                                            await append({
                                                role: 'user',
                                                content: question
                                            });
                                        }}
                                    >
                                        {question}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        {messages.map((m: any) => (
                            <div key={m.id} className={cn("flex gap-3", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                                    m.role === 'user' ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-foreground"
                                )}>
                                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>
                                <div className={cn(
                                    "p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                                    m.role === 'user'
                                        ? "bg-primary text-primary-foreground rounded-tr-none"
                                        : "bg-muted/50 border border-border/50 rounded-tl-none"
                                )}>
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <ReactMarkdown>
                                            {m.content.replace(/\[NAVIGATE:[A-Z]+\]/g, '')}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-3 animate-in fade-in">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground border border-border">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-tl-none p-4 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-duration:0.8s]" />
                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
                                    <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t bg-background">
                    <form onSubmit={handleSubmit} className="flex gap-2 relative">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask a question..."
                            className="pr-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-1 top-1 bottom-1 h-auto rounded-lg"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                    <p className="text-[10px] text-center text-muted-foreground mt-2">
                        Powered by Arrow AI Engine
                    </p>
                </div>
            </div>
        </>
    );
}


import { motion } from "framer-motion";
import { Construction, Gamepad2, Ghost } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UnderDevelopment = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-75" />
            </div>

            <div className="z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    {/* Icon */}
                    <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <Construction className="w-12 h-12 text-primary" />
                    </div>

                    {/* Text Content */}
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-600 mb-6 tracking-tight">
                        Work in Progress
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        We're currently crafting something extraordinary. Our digital experience is getting a major upgrade to serve you better.
                    </p>

                    <div className="flex justify-center gap-4 mt-8">
                        <Link to="/game">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
                                <Gamepad2 className="mr-2 w-5 h-5" />
                                Have Fun Game
                            </Button>
                        </Link>
                        <Link to="/ghost">
                            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 h-auto shadow-lg shadow-secondary/25 transition-all hover:scale-105 active:scale-95">
                                <Ghost className="mr-2 w-5 h-5" />
                                Ghost
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 text-sm text-muted-foreground/60 z-10">
                &copy; {new Date().getFullYear()} Arrows Designs. All rights reserved.
            </div>
        </div>
    );
};

export default UnderDevelopment;


import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryViewerProps {
    isOpen: boolean;
    onClose: () => void;
    storyData: {
        content: string; // URL
        type: 'image' | 'video'; // expand later
        timestamp: number;
    } | null;
}

const StoryViewer = ({ isOpen, onClose, storyData }: StoryViewerProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isOpen || !storyData) return;

        // Reset progress
        setProgress(0);

        // Auto-close after 7 seconds for images
        const duration = 7000;
        const interval = 100; // update every 100ms
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setProgress((currentStep / steps) * 100);

            if (currentStep >= steps) {
                clearInterval(timer);
                onClose();
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isOpen, storyData, onClose]);

    if (!isOpen || !storyData) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
            {/* Close Button */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 z-50"
                onClick={onClose}
            >
                <X className="w-8 h-8" />
            </Button>

            <div className="relative w-full max-w-md h-[80vh] bg-black rounded-lg overflow-hidden shadow-2xl mx-4">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 z-10">
                    <div
                        className="h-full bg-white transition-all ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Content */}
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        src={storyData.content}
                        alt="Story"
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default StoryViewer;


import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Game = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const toggleFullscreen = () => {
        if (iframeRef.current) {
            if (!document.fullscreenElement) {
                iframeRef.current.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-black overflow-hidden relative">
            {/* Header / Controls */}
            <div className="bg-black/50 backdrop-blur-md p-4 flex justify-between items-center absolute top-0 left-0 w-full z-10">
                <Link to="/">
                    <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white gap-2">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Button>
                </Link>
                <h1 className="text-xl font-bold text-white hidden md:block tracking-widest">ESCAPE ROAD</h1>
                <Button variant="outline" size="icon" onClick={toggleFullscreen} className="bg-transparent border-white/20 text-white hover:bg-white/10">
                    <Maximize2 className="w-5 h-5" />
                </Button>
            </div>

            {/* Game Iframe */}
            <div className="flex-1 w-full h-full pt-16 md:pt-0">
                <iframe
                    ref={iframeRef}
                    src="/game/index.html"
                    title="Escape Road"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-pointer-lock"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export default Game;

import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Calculate offset from the center of the viewport
      const x = (e.clientX - window.innerWidth / 2) / 15;
      const y = (e.clientY - window.innerHeight / 2) / 15;

      // Push the values to CSS variables
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="not-found-wrapper" ref={containerRef}>
      <div className="particles">
        <div className="dot" style={{ top: '20%', left: '10%', '--speed': '8s' } as React.CSSProperties}></div>
        <div className="dot" style={{ top: '70%', left: '80%', '--speed': '12s' } as React.CSSProperties}></div>
        <div className="dot" style={{ top: '40%', left: '90%', '--speed': '10s' } as React.CSSProperties}></div>
      </div>

      <div className="container-404">
        <h1 className="bg-text">404</h1>

        <div className="character-wrapper" id="parallax-monster">
          <img src="/monster.png" alt="Cute Monster" className="floating-monster" />
        </div>

        <div className="content">
          <div className="button-row">
            <Link to="/" className="back-btn">
              <span><ArrowLeft size={16} /></span>
              Return to Base Camp
            </Link>
          </div>
          <h2>Whoops! Looks Like This Page Went on Vacation!</h2>
          <p>Uh oh! Our little cartoon friends might have accidentally scribbled out this address. We can't seem to find the page you're looking for.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

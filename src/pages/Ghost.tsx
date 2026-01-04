import { useState } from 'react';
import './Ghost.css';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Ghost = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="ghost-page-container">
            {/* Navigation Home Button */}
            <div className="absolute top-4 left-4 z-50">
                <Link to="/">
                    <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
                        <Home className="w-5 h-5" />
                    </Button>
                </Link>
            </div>

            <div className="switch-container">
                <div id="boo" className={isChecked ? "show" : "hide"}>
                    Boo!
                </div>
                <label className="switch">
                    <input
                        id="toggle"
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleToggle}
                    />
                    <div className="slider round">
                        <div>
                            <div className="ghost" />
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default Ghost;

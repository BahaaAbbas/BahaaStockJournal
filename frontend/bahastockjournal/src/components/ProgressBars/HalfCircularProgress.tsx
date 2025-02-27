import { useState } from "react";
import { CircularProgressProps } from "../../Types/ProgressBars";



const HalfCircularProgress = ({ percent, strokeText, trailText }: CircularProgressProps) => {
    const radius = 50;
    const strokeWidth = 8;
    const trailWidth = 6;
    const circumference = Math.PI * radius; 
    const progressOffset = ((100 - percent) / 100) * circumference;

    const [hoverText, setHoverText] = useState<string | null>(null);

    return (
        <div className="relative flex justify-center items-center w-[120px] h-[100px]">
            <svg width="120" height="70" viewBox="0 0 120 60">
                {/* Trail (Background Half-Circle) */}
                <path
                    d="M 10,50 A 50,50 0 0,1 110,50" 
                    fill="transparent"
                    stroke="#f05143"
                    strokeWidth={trailWidth}
                    onMouseEnter={() => setHoverText(trailText)}
                    onMouseLeave={() => setHoverText(null)}
                />

                {/* Progress Stroke */}
                <path
                    d="M 10,50 A 50,50 0 0,1 110,50" 
                    fill="transparent"
                    stroke="#259863"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="butt"
                    onMouseEnter={() => setHoverText(strokeText)}
                    onMouseLeave={() => setHoverText(null)}
                />
            </svg>

            {/* Tooltip */}
            {hoverText && (
                <div className="absolute top-[-20px] px-2 py-1 bg-black text-white text-xs rounded-md">
                    {hoverText}
                </div>
            )}
        </div>
    );
};

export default HalfCircularProgress;

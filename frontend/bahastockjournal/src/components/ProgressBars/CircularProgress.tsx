import { useState } from "react";
import { CircularProgressProps } from "../../Types/ProgressBars";



const CircularProgress = ({ percent, strokeText, trailText }: CircularProgressProps) => {
    const radius = 50;
    const strokeWidth = 8;
    const trailWidth = 6;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = ((100 - percent) / 100) * circumference;


    const [hoverText, setHoverText] = useState<string | null>(null);

    return (
        <div className="relative flex justify-center items-center w-[100px] h-[100px]">
            <svg width="140" height="140" viewBox="0 0 120 120">
                {/* Trail (Background Circle) */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="#f05143"
                    strokeWidth={trailWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={0}
                    strokeLinecap="butt"
                    onMouseEnter={() => setHoverText(trailText)}
                    onMouseLeave={() => setHoverText(null)}
                />

                {/* Progress Stroke */}
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    stroke="#259863"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={progressOffset}
                    strokeLinecap="butt"
                    transform="rotate(-90 60 60)"
                    onMouseEnter={() => setHoverText(strokeText)}
                    onMouseLeave={() => setHoverText(null)}
                />
            </svg>

            {/* Tooltip */}
            {hoverText && (
                <div className="absolute top-[-30px] px-2 py-1 bg-black text-white text-xs rounded-md">
                    {hoverText}
                </div>
            )}
        </div>
    );
};

export default CircularProgress;
import { useState } from "react";
import { LineProgressBarProps } from "../../Types/ProgressBars";



const LineProgressBar = ({ percent, Text, type }: LineProgressBarProps) => {
    const [hoverText, setHoverText] = useState<string | undefined>(undefined);

    return (
        <div className="relative w-[220px] h-[20px]">


            {/* Progress Stroke (Foreground Bar) */}
            <div
                className={`absolute top-0 left-0 h-[7px] ${type === 'W' ? 'bg-[#259863]' : 'bg-[#f05143]'} rounded-md transition-all duration-300`}
                style={{ width: `${percent}%` }}
                onMouseEnter={() => setHoverText(Text)}
                onMouseLeave={() => setHoverText(undefined)}
            ></div>

            {/* Tooltip */}
            {hoverText && (
                <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md">
                    {hoverText}
                </div>
            )}
        </div>
    );
};

export default LineProgressBar;

import { useState } from "react";
import { useDashboardContext } from "../../../contexts/DashboardContext"
import { useTheme } from "../../../contexts/ThemeContext";

const DashboardDisplayDays = () => {

    const { comDays, setCom30Days, setCom60Days, setCom90Days } = useDashboardContext();
    const [hoveredSelectdays, setHoveredSelectdays] = useState<string | null>(null);
    const { theme } = useTheme();

    return (

        <div className='flex justify-between items-center w-[200px] h-[35px] rounded-md border-gray-300 p-3 bg-[#e0e4ec] dark:bg-[#2e3446]'>
            <p
                className={`title-text p-1 rounded-md cursor-pointer font-semibold
            ${(comDays === '30 Days' || hoveredSelectdays === '30 Days') && theme === 'light' && 'bg-[#ffffff] text-[#000000]'}
            ${!(comDays === '30 Days' || hoveredSelectdays === '30 Days') && theme === 'light' && 'bg-[#e0e4ec] text-gray-400'}
            ${(comDays === '30 Days' || hoveredSelectdays === '30 Days') && theme === 'dark' && 'bg-[#505669] text-white'}
             ${!(comDays === '30 Days' || hoveredSelectdays === '30 Days') && theme === 'dark' && 'bg-[#2e3446] text-gray-400'}

            `}
                onClick={setCom30Days}
                onMouseEnter={() => setHoveredSelectdays('30 Days')}
                onMouseLeave={() => setHoveredSelectdays(null)}
            >
                30 Days
            </p>
            <p
                className={`title-text p-1 rounded-md font-semibold cursor-pointer
             ${(comDays === '60 Days' || hoveredSelectdays === '60 Days') && theme === 'light' && 'bg-[#ffffff] text-[#000000]'}
            ${!(comDays === '60 Days' || hoveredSelectdays === '60 Days') && theme === 'light' && 'bg-[#e0e4ec] text-gray-400'}
            ${(comDays === '60 Days' || hoveredSelectdays === '60 Days') && theme === 'dark' && 'bg-[#505669] text-white'}
             ${!(comDays === '60 Days' || hoveredSelectdays === '60 Days') && theme === 'dark' && 'bg-[#2e3446] text-gray-400'}
             `}
                onClick={setCom60Days}
                onMouseEnter={() => setHoveredSelectdays('60 Days')}
                onMouseLeave={() => setHoveredSelectdays(null)}
            >
                60 Days
            </p>
            <p
                className={`title-text p-1 rounded-md font-semibold cursor-pointer 
            ${(comDays === '90 Days' || hoveredSelectdays === '90 Days') && theme === 'light' && 'bg-[#ffffff] text-[#000000]'}
            ${!(comDays === '90 Days' || hoveredSelectdays === '90 Days') && theme === 'light' && 'bg-[#e0e4ec] text-gray-400'}
            ${(comDays === '90 Days' || hoveredSelectdays === '90 Days') && theme === 'dark' && 'bg-[#505669] text-white'}
             ${!(comDays === '90 Days' || hoveredSelectdays === '90 Days') && theme === 'dark' && 'bg-[#2e3446] text-gray-400'}
             `}
                onClick={setCom90Days}
                onMouseEnter={() => setHoveredSelectdays('90 Days')}
                onMouseLeave={() => setHoveredSelectdays(null)}
            >
                90 Days
            </p>
        </div>
    )
}

export default DashboardDisplayDays
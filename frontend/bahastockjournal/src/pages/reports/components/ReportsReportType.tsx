import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useReportsContext } from "../../../contexts/ReportsContext";

const ReportsReportType = () => {
    const { reportsType, setReportsTypeCalendar, setReportsTypeRecent, setReportsTypeYMD } = useReportsContext();
    const [hoveredSelectType, setHoveredSelectType] = useState<string | null>(null);
    const { theme } = useTheme();



    return (

        <div className='flex justify-between items-center w-[300px] h-[35px] rounded-md border-gray-300 p-3 bg-[#e0e4ec] dark:bg-[#2e3446]'>
            <p
                className={`title-text p-1 rounded-md cursor-pointer font-semibold
            ${(reportsType === 'Recent' || hoveredSelectType === 'Recent') && theme === 'light' && 'bg-[#ffffff] text-[#000000]'}
            ${!(reportsType === 'Recent' || hoveredSelectType === 'Recent') && theme === 'light' && 'bg-[#e0e4ec] text-gray-400'}
            ${(reportsType === 'Recent' || hoveredSelectType === 'Recent') && theme === 'dark' && 'bg-[#505669] text-white'}
             ${!(reportsType === 'Recent' || hoveredSelectType === 'Recent') && theme === 'dark' && 'bg-[#2e3446] text-gray-400'}

            `}
                onClick={setReportsTypeRecent}
                onMouseEnter={() => setHoveredSelectType('Recent')}
                onMouseLeave={() => setHoveredSelectType(null)}
            >
                Recent
            </p>
            <p
                className={`title-text p-1 rounded-md font-semibold cursor-pointer
             ${(reportsType === 'Year/Month/Day' || hoveredSelectType === 'Year/Month/Day') && theme === 'light' && 'bg-[#ffffff] text-[#000000]'}
            ${!(reportsType === 'Year/Month/Day' || hoveredSelectType === 'Year/Month/Day') && theme === 'light' && 'bg-[#e0e4ec] text-gray-400'}
            ${(reportsType === 'Year/Month/Day' || hoveredSelectType === 'Year/Month/Day') && theme === 'dark' && 'bg-[#505669] text-white'}
             ${!(reportsType === 'Year/Month/Day' || hoveredSelectType === 'Year/Month/Day') && theme === 'dark' && 'bg-[#2e3446] text-gray-400'}
             `}
                onClick={setReportsTypeYMD}
                onMouseEnter={() => setHoveredSelectType('Year/Month/Day')}
                onMouseLeave={() => setHoveredSelectType(null)}
            >
                Year/Month/Day
            </p>
            <p
                className={`title-text p-1 rounded-md font-semibold cursor-pointer 
            ${(reportsType === 'Calendar' || hoveredSelectType === 'Calendar') && theme === 'light' && 'bg-[#ffffff] text-[#000000]'}
            ${!(reportsType === 'Calendar' || hoveredSelectType === 'Calendar') && theme === 'light' && 'bg-[#e0e4ec] text-gray-400'}
            ${(reportsType === 'Calendar' || hoveredSelectType === 'Calendar') && theme === 'dark' && 'bg-[#505669] text-white'}
             ${!(reportsType === 'Calendar' || hoveredSelectType === 'Calendar') && theme === 'dark' && 'bg-[#2e3446] text-gray-400'}
             `}
                onClick={setReportsTypeCalendar}
                onMouseEnter={() => setHoveredSelectType('Calendar')}
                onMouseLeave={() => setHoveredSelectType(null)}
            >
                Calendar
            </p>
        </div>
    )
}

export default ReportsReportType
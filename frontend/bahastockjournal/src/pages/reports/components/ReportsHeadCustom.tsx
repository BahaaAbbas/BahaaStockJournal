import { useState } from "react";
import { useReportsContext } from "../../../contexts/ReportsContext"
import ReportsReportType from "./ReportsReportType";
import DashboardDisplayDays from "../../dashboard/components/DashboardDisplayDays";

const ReportsHeadCustom = () => {

    const { headCustomMenuItems, reportsType } = useReportsContext();

    const [selected, setSelected] = useState<string | null>('Overview');
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div>
            {/* Head Custom Menu  Items */}
            <div className='flex gap-3 h-[50px] items-center justify-start border-b border-white'>
                {headCustomMenuItems.map((item) => (
                    <p
                        key={item}
                        className={`text-[12px] font-semibold  mt-2 p-3  cursor-pointer  ${(selected === item || hovered === item)
                            ? "text-[#178b5a] border-b border-[#178b5a]"
                            : "text-LD"
                            }`}
                        onClick={() => setSelected(item)}
                        onMouseEnter={() => setHovered(item)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        {item}
                    </p>
                ))}
            </div>


            <div className='flex justify-between mt-6 '>
                <ReportsReportType />


                {
                    reportsType !== 'Year/Month/Day'
                    && <div className={`dark:bg-[#2e3446] bg-[#e0e4ec] ${reportsType === 'Calendar' ? 'p-2' : 'py-2'} rounded-md  h-[35px]  flex justify-between items-center`}>
                        {reportsType === 'Recent' && <DashboardDisplayDays />}


                        {reportsType === 'Calendar' && (
                            <p
                                className={`title-text p-1 rounded-md cursor-pointer font-semibold
                           bg-[#ffffff]  dark:bg-[#505669] 

                      `}

                            >
                                2025
                            </p>
                        )}
                    </div>
                }


            </div>

        </div>
    )
}

export default ReportsHeadCustom
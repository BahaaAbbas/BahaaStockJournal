import { FC, useState } from "react";
import DashboardButtons from "./DashboardButtons";
import DashboardLineWithTexts from "./DashboardLineWithTexts";
import { DashboardPerformanceCardProps } from "../../../Types/Dashboard";


const DashboardPerformanceCard: FC<DashboardPerformanceCardProps> = ({
    Icon,
    title,
    height,
    pagination = false,
    data = {}
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const maxPage = pagination ? Object.keys(data).length : 1;
    const currentData = data[currentPage] || [];

    return (
        <div className={`bgS-LD text-LD w-[250px] h-[${height ? height : '328px'}] rounded-lg relative font-semibold flex flex-col justify-between`}>
            <div className="flex flex-col justify-start gap-2">


                {/* Icon & Title */}
                <div className="flex items-center p-3 gap-1">
                    <div className="border rounded p-1.5 text-xs">
                        <Icon />
                    </div>
                    <p className="title-text">{title}</p>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center items-center gap-4 mb-2">
                    {currentData.length > 0 ? (
                        currentData.map((item, index) => (
                            <DashboardLineWithTexts key={index} {...item} />
                        ))
                    ) : (
                        <p className="text-sm text-gray-400">No data available</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-end">
                {/* Pagination Buttons */}
                {pagination && maxPage > 1 && (
                    <div className="flex justify-center">
                        <DashboardButtons maxCount={maxPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPerformanceCard;

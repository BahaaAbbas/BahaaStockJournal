import { DashboardButtonsProps } from "../../../Types/Dashboard"
import { ChevronLeft, ChevronRight } from "lucide-react";

const DashboardButtons = ({ maxCount, currentPage, setCurrentPage }: DashboardButtonsProps) => {

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < maxCount) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 bgS-LD p-2 rounded-md w-[150px]">
            {/* Left Button */}
            <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className={`p-2 rounded-md transition-all ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
            >
                <ChevronLeft size={18} />
            </button>

            {/* Page Indicator */}
            <p className=" text-sm">
                {currentPage}  /  {maxCount}
            </p>

            {/* Right Button */}
            <button
                onClick={goToNext}
                disabled={currentPage === maxCount}
                className={`p-2 rounded-md transition-all ${currentPage === maxCount ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
}

export default DashboardButtons
import { DashboardLineWithTextsProps } from "../../../Types/Dashboard";

const DashboardLineWithTexts = ({
    percent,
    type,
    leftText,
    rightPriceText,
    rightPercentText,
}: DashboardLineWithTextsProps) => {

    return (
        <div className="relative w-[220px]">
            {/* Top Texts */}
            <div className="flex justify-between text-xs ">
                <p>{leftText}</p>
                <p>{rightPriceText}  {rightPercentText}</p>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-[5px] bg-[#464f5b] rounded-md">
                {/* Progress Stroke */}
                <div
                    className={`absolute top-0 left-0 h-[5px] ${type === 'W' ? 'bg-[#259863]' : 'bg-[#f05143]'} rounded-md transition-all duration-300`}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
}

export default DashboardLineWithTexts
import { useState } from "react";
import { useDashboardContext } from "../../../contexts/DashboardContext";
import { useTheme } from "../../../contexts/ThemeContext";

const DAY_OPTIONS = [
  { label: "30 Days", onClickKey: "setCom30Days" },
  { label: "60 Days", onClickKey: "setCom60Days" },
  { label: "90 Days", onClickKey: "setCom90Days" },
];

const DashboardDisplayDays = () => {
  const { comDays, setCom30Days, setCom60Days, setCom90Days } = useDashboardContext();
  const { theme } = useTheme();
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const handleClick = (label: string) => {
    if (label === "30 Days") setCom30Days();
    else if (label === "60 Days") setCom60Days();
    else if (label === "90 Days") setCom90Days();
  };

  const getClassNames = (label: string) => {
    const isActive = comDays === label || hoveredDay === label;
    const isLight = theme === "light";

    return `
      title-text p-1 rounded-md font-semibold cursor-pointer 
      ${isActive && isLight ? "bg-[#ffffff] text-[#000000]" : ""}
      ${!isActive && isLight ? "bg-[#e0e4ec] text-gray-400" : ""}
      ${isActive && !isLight ? "bg-[#505669] text-white" : ""}
      ${!isActive && !isLight ? "bg-[#2e3446] text-gray-400" : ""}
    `;
  };

  return (
    <div className="flex justify-between items-center w-[200px] h-[35px] rounded-md border-gray-300 p-3 bg-[#e0e4ec] dark:bg-[#2e3446]">
      {DAY_OPTIONS.map(({ label }) => (
        <p
          key={label}
          className={getClassNames(label)}
          onClick={() => handleClick(label)}
          onMouseEnter={() => setHoveredDay(label)}
          onMouseLeave={() => setHoveredDay(null)}
        >
          {label}
        </p>
      ))}
    </div>
  );
};

export default DashboardDisplayDays;

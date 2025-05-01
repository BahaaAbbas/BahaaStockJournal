
import { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import TradesTable from "./TradesTable";
import TradesCharts from "./TradesCharts";

const Trades_OPTIONS = ["Table", "Charts"];

const TradesTableHeader = () => {

  const { theme } = useTheme();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState("Table");

  const getClassNames = (label: string) => {
    const isActive = selectedOption === label || hoveredOption === label;
    const isLight = theme === "light";

    return `
      title-text p-1 rounded-md font-semibold cursor-pointer 
      ${isActive && isLight ? "bg-[#ffffff] text-[#000000]" : ""}
      ${!isActive && isLight ? "bg-[#e0e4ec] text-gray-400" : ""}
      ${isActive && !isLight ? "bg-[#505669] text-white" : ""}
      ${!isActive && !isLight ? "bg-[#2e3446] text-gray-400" : ""}
    `;
  };

  const renderTableComponent = () => {
    if (selectedOption === "Table") return <TradesTable />;
    if (selectedOption === "Charts") return <TradesCharts />;
    return null;
  };

  return (
    <div className="bgS-LD rounded-md p-2">


      <div className="flex justify-between items-center">
        <div >

          <p className="text-md  font-semibold" >Trades</p>

        </div>
        <div className="flex justify-between items-center w-[150px] h-[35px] rounded-md border-gray-300 p-3 bg-[#e0e4ec] dark:bg-[#2e3446]">
          {Trades_OPTIONS.map((label) => (
            <p
              key={label}
              className={getClassNames(label)}
              onClick={() => setSelectedOption(label)}
              onMouseEnter={() => setHoveredOption(label)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {label}
            </p>
          ))}
        </div>



      </div>

      <div className="mt-4">
        {renderTableComponent()}
      </div>
    </div>
  );

}

export default TradesTableHeader

import { SetStateAction, useState } from "react";
import { useReportsContext } from "../../../contexts/ReportsContext";
import ReportsChartCard from "../components/ReportsChartCard";

const YMDReportType = () => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [selectedOption, setSelectedOption] = useState("Monthly");
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
  };
  const { sampleBarData } = useReportsContext();
  return (
    <div className="flex flex-col gap-2" >

      <div className="flex justify-between gap-2">
        <ReportsChartCard title="TRADE DISTRIBUTION BY YEAR" chartType="Bar" data={sampleBarData} dataKey="value" />
        <ReportsChartCard title="PERFORMANCE BY YEAR" chartType="Bar" data={sampleBarData} dataKey="value" />
      </div>


      <div className=' flex justify-between items-center'>
        <div className='border border-[#3F4559] w-fit p-1 rounded dark:bg-[#2e3446] bg-[#e0e4ec]'>
          <button
            className={`title-text py-1 px-2 rounded  bg-[#ffffff]  dark:bg-[#505669]  cursor-pointer `}


          >
            2025
          </button>
        </div>

        <div className='flex gap-2 items-center'>
          <p className='title-text'>TIMEFRAME</p>

          <select
            value={selectedOption}
            onChange={handleChange}
            className=" dark:bg-[#2e3446] bg-[#ffffff] cursor-pointer border border-[#3F4559] rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
          </select>

        </div>

      </div>

      {
        selectedOption === 'Monthly' && (
          <div className="flex justify-between gap-2">
            <ReportsChartCard title="TRADE DISTRIBUTION BY MONTH" chartType="Bar" data={sampleBarData} dataKey="value" />
            <ReportsChartCard title="PERFORMANCE BY MONTH" chartType="Bar" data={sampleBarData} dataKey="value" />
          </div>
        )


      }

      {
        selectedOption === 'Weekly' && (
          <div className="flex justify-between gap-2">
            <ReportsChartCard title="TRADE DISTRIBUTION BY WEEK" chartType="Bar" data={sampleBarData} dataKey="value" />
            <ReportsChartCard title="PERFORMANCE BY WEEK" chartType="Bar" data={sampleBarData} dataKey="value" />
          </div>
        )


      }


      <div className=' flex gap-2 justify-center items-center my-2'>
        <p className='title-text'>2025:</p>
        <div className="flex justify-between items-center w-[600px] h-[35px] rounded-md border-gray-300 p-3 dark:bg-[#2e3446] bg-[#e0e4ec] ">
          {months.map((month) => (
            <button
              key={month}
              className={`py-1 px-2 w-[40px] text-center rounded-md cursor-pointer ${selectedMonth === month || hoveredMonth === month
                ? " bg-[#ffffff] dark:bg-[#505669]"
                : "bg-transparent text-[#707893] font-[500]"
                }`}
              onClick={() => setSelectedMonth(month)}
              onMouseEnter={() => setHoveredMonth(month)}
              onMouseLeave={() => setHoveredMonth(null)}
            >
              {month}
            </button>
          ))}
        </div>


      </div>

      <div className="flex justify-between gap-2">
        <ReportsChartCard title="TRADE DISTRIBUTION BY DAY" chartType="Bar" data={sampleBarData} dataKey="value" />
        <ReportsChartCard title="PERFORMANCE BY DAY OF MONTH" chartType="Bar" data={sampleBarData} dataKey="value" />
      </div>


    </div>
  )
}

export default YMDReportType
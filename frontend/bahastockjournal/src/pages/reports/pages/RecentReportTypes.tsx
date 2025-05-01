import { useReportsContext } from "../../../contexts/ReportsContext"
import ReportsChartCard from "../components/ReportsChartCard";

const RecentReportTypes = () => {

  const { sampleBarData, sampleLineData } = useReportsContext();

  return (
    <div className="flex flex-col gap-2" >

      <div className="flex justify-between gap-2">
        <ReportsChartCard title="GROSS DAILY P&L" chartType="Bar" data={sampleBarData} dataKey="value" />
        <ReportsChartCard title="GROSS CUMULATIVE P&L" chartType="Line" data={sampleLineData} dataKey="value" />
      </div>

      <div className="flex justify-between gap-2">
        <ReportsChartCard title="DAILY VOLUME" chartType="Bar" data={sampleBarData} dataKey="value" />
        <ReportsChartCard title="WIN %" chartType="Bar" data={sampleBarData} dataKey="value" />
      </div>


    </div>
  )
}

export default RecentReportTypes
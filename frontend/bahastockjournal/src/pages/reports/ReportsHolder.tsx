import { useReportsContext } from "../../contexts/ReportsContext"
import ReportsHeadCustom from "./components/ReportsHeadCustom"
import ReportsHeader from "./components/ReportsHeader"
import CalendarReportType from "./pages/CalendarReportType";
import RecentReportTypes from "./pages/RecentReportTypes";
import YMDReportType from "./pages/YMDReportType";

const ReportsHolder = () => {



    const { reportsType } = useReportsContext();

    return (
        // for page
        <div className=" min-h-screen p-3 bgLayout-LD  ">
            {/* for title and header page */}
            <div className="flex justify-between   ">

                <p className="text-xl  font-semibold" >Reports</p>


            </div>

            {/* for page content holder */}
            <div className=" rounded-md   mt-2  ">

                {/* for page content itself */}
                <div className=" flex flex-col gap-2">

                    <ReportsHeader />

                    <ReportsHeadCustom />

                    {reportsType === 'Recent' && <RecentReportTypes />}
                    {reportsType === 'Year/Month/Day' && <YMDReportType />}
                    {reportsType === 'Calendar' && <CalendarReportType />}

                </div>
            </div>
        </div>
    )
}

export default ReportsHolder
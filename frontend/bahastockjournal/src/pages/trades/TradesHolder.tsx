import ReportsHeader from "../reports/components/ReportsHeader"
import TradesTableHeader from "./components/TradesTableHeader"

const TradesHolder = () => {
    return (
        // for page
        <div className=" min-h-screen p-3 bgLayout-LD  ">
            {/* for title and header page */}
            <div className="flex justify-between   ">

                <p className="text-xl  font-semibold" >Trades</p>

            </div>

            {/* for page content holder */}
            <div className=" rounded-md   mt-2  ">

                {/* for page content itself */}
                <div className=" flex flex-col gap-6">

                    <ReportsHeader />


                    <TradesTableHeader />



                </div>
            </div>

        </div>
    )
}

export default TradesHolder
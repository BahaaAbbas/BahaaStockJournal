import ReportsHeader from "../reports/components/ReportsHeader"
import JournalEntry from "./components/JournalEntry"
import JournalSide from "./components/JournalSide"

const dates = ["2024-11-21", "2024-11-22"]

const JournalHolder = () => {
    return (
        // for page
        <div className=" min-h-screen p-3 bgLayout-LD  ">
            {/* for title and header page */}
            <div className="flex justify-between   ">

                <p className="text-xl  font-semibold" >Journal</p>

            </div>

            {/* for page content holder */}
            <div className=" rounded-md   mt-2  ">

                {/* for page content itself */}
                <div className=" flex flex-col gap-2">

                    <ReportsHeader />

                    <div className="flex gap-4 items-start">

                        <div className="flex flex-col gap-4 flex-1">
                            {dates.map((date, index) => (
                                <JournalEntry key={index} date={date} />
                            ))}
                        </div>


                        <div className="w-[300px]">
                            <JournalSide />
                        </div>
                    </div>







                </div>
            </div>

        </div>
    )
}

export default JournalHolder

import DashboardDisplayCardHolder from "./components/DashboardDisplayCardHolder";
import DashboardDisplayDays from "./components/DashboardDisplayDays";
import DashboardWeekly from "./pages/DashboardWeekly";
import { MdAttachMoney } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import WinningVsLosingTrades from "./pages/WinningVsLosingTrades";
import DashboardHalfCirculeCard from "./components/DashboardHalfCirculeCard";
import DashboardLineProgressBarCard from "./components/DashboardLineProgressBarCard";
import CumulativePandL from "./pages/CumulativePandL";
import CumulativeDrawdown from "./pages/CumulativeDrawdown";
import WinPercentage from "./pages/WinPercentage";
import DailyVolume from "./pages/DailyVolume";
import AverageTradePandL from "./pages/AverageTradePandL";
import OpenTrades from "./pages/OpenTrades";
import DashboardPerformanceCard from "./components/DashboardPerformanceCard";
import { useDashboardContext } from "../../contexts/DashboardContext";



const DashboardHolder = () => {

    const sampleData = [
        { date: '2024-11-01', cumulativePL: 200 },
        { date: '2024-11-02', cumulativePL: 450 },
        { date: '2024-11-03', cumulativePL: 300 },
    ];

    const sampleData2 = [
        { date: '2024-11-01', cumulativePL: 450 },
        { date: '2024-11-02', cumulativePL: 600 },
        { date: '2024-11-03', cumulativePL: 150 },
    ];



    const sampleData3 = [
        { date: '2024-11-01', volume: 450 },
        { date: '2024-11-02', volume: 600 },
        { date: '2024-11-03', volume: 150 },
    ];



    const {
        PerformanceByDayOfWeek, PerformanceByDuration, PerformanceByPrice,
        PerformanceByHourOfDay, PerformanceByInstrumentOpeningGap, PerformanceByInstrumentDayType,
        PerformanceByInstrumentVolume, PerformanceByMonthOfYear, PerformanceBySymbolAtr,
        PerformanceByRvol, PerformanceByInstrumentMovement

    } = useDashboardContext()


    return (
        // for page
        <div className=" min-h-screen p-3 bgLayout-LD  ">
            {/* for title and header page */}
            <div className="flex justify-between   ">

                <p className="text-xl  font-semibold" >Dashboard</p>

                <DashboardDisplayDays />
            </div>

            {/* for page content holder */}
            <div className=" rounded-md   mt-2  ">

                {/* for page content itself */}
                <div className=" flex flex-col gap-2">

                    <DashboardWeekly />

                    {/* 1st */}
                    <div className="flex w-full gap-2 ">
                        <div className="flex-1">
                            <CumulativePandL data={sampleData} />
                        </div>


                        <div className=" flex flex-col  gap-2 ">
                            <div className="flex  gap-2">
                                <WinningVsLosingTrades />

                                <DashboardLineProgressBarCard
                                    Icon={FaChartLine}
                                    title="Hold Time Winning Trades vs Losing Trades"
                                    textContent1="5 minutes"
                                    textContent2="3 minutes"
                                    percentStroke={90}
                                    percentTrail={10}
                                    strokeText="winningIsL"
                                    trailText="losingLine"


                                />
                            </div>

                            <div className="flex gap-2">
                                <DashboardLineProgressBarCard
                                    Icon={FaChartLine}
                                    title="Average Winning Trade vs Losing Trade"
                                    textContent1="$ 5,522.07"
                                    textContent2="$ -470"
                                    percentStroke={75}
                                    percentTrail={25}
                                    strokeText="winningIsL"
                                    trailText="losingLine"


                                />

                                <DashboardHalfCirculeCard
                                    percent={75}
                                    trailText="losing"
                                    strokeText="winningIsL"
                                    title="Largest Gain vs Largest Loss"
                                    Icon={FaChartLine}
                                />
                            </div>

                        </div>

                    </div>



                    {/* 2nd */}
                    <div className="flex w-full gap-2">
                        <div className="flex-1">
                            <WinPercentage data={sampleData3} />
                        </div>


                        <div className=" flex   gap-2 ">
                            <div className="flex   ">

                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Day Of Week" pagination={false} data={PerformanceByDayOfWeek} />
                            </div>

                            <div className="flex  flex-col  gap-2">
                                <DashboardHalfCirculeCard
                                    percent={75}
                                    trailText="losing"
                                    strokeText="winningIsL"
                                    title="Average MFE vs MAE"
                                    Icon={FaChartLine}
                                />

                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Duration" pagination={false} data={PerformanceByDuration} height='160px' />
                            </div>

                        </div>

                    </div>

                    {/* 3rd */}
                    <div className="flex w-full gap-2 ">
                        <div className="flex-1">
                            <CumulativeDrawdown data={sampleData2} />
                        </div>


                        <div className=" flex   gap-2 ">
                            <div className="flex   ">
                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Price" pagination={true} data={PerformanceByPrice} />
                            </div>

                            <div className="flex   ">
                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Hour Of Day" pagination={true} data={PerformanceByHourOfDay} />
                            </div>

                        </div>

                    </div>

                    {/* 4th */}
                    <div className="flex w-full gap-2 ">
                        <div className="flex-1">
                            <DailyVolume data={sampleData3} />
                        </div>


                        <div className=" flex flex-col  gap-2 ">
                            <div className="flex  gap-2">

                                <DashboardDisplayCardHolder
                                    Icon={MdAttachMoney}
                                    title="Total Fees"
                                    content="$ 0.00"
                                />
                                <DashboardHalfCirculeCard
                                    percent={75}
                                    trailText="losing"
                                    strokeText="winningIsL"
                                    content="29.14"
                                    title="Profit Factor"
                                    Icon={FaChartLine}
                                />
                            </div>

                            <div className="flex gap-2">
                                <DashboardDisplayCardHolder
                                    Icon={FaChartLine}
                                    title="Max Consecutive Wins"
                                    content="100"
                                />

                                <DashboardDisplayCardHolder
                                    Icon={FaChartLine}
                                    title="Max Consecutive Losses"
                                    content="5"
                                />

                            </div>

                        </div>

                    </div>


                    {/* 5th */}
                    <div className="flex w-full gap-2  ">
                        <div className="flex-1">
                            <AverageTradePandL data={sampleData3} />
                        </div>


                        <div className=" flex   gap-2 ">
                            <div className="flex   ">
                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Month Of Year" pagination={true} data={PerformanceByMonthOfYear} />
                            </div>

                            <div className="flex   ">
                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Symbol Atr" pagination={true} data={PerformanceBySymbolAtr} />
                            </div>

                        </div>

                    </div>

                    {/* 6th */}
                    <div className="flex w-full gap-2 justify-between ">

                        <div className="flex flex-col gap-2">
                            <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Instrument Movement" pagination={true} data={PerformanceByInstrumentMovement} />

                            <DashboardDisplayCardHolder
                                Icon={FaChartLine}
                                title="Average Daily Volume"
                                content="26668"
                            />

                        </div>
                        <div className="flex flex-col gap-2">
                            <DashboardDisplayCardHolder
                                Icon={FaChartLine}
                                title="Total Number of Trades"
                                content="5234"
                            />

                            <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Instrument Volume" pagination={true} data={PerformanceByInstrumentVolume} />


                        </div>



                        <div className="flex flex-col gap-2">
                            <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Instrument Opening Gap" pagination={false} data={PerformanceByInstrumentOpeningGap} />

                            <DashboardDisplayCardHolder
                                Icon={MdAttachMoney}
                                title="Average Position MFE"
                                content="$ 5,280.25"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <DashboardDisplayCardHolder
                                Icon={MdAttachMoney}
                                title="Average Position MAE"
                                content="$ -50.87 "
                            />
                            <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Instrument Day Type" pagination={false} data={PerformanceByInstrumentDayType} />


                        </div>


                    </div>

                    {/* 7th */}
                    <div className="w-full flex justify-between gap-2">
            
                        <OpenTrades />
                        <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Rvol" pagination={true} data={PerformanceByRvol} />
                    </div>


                </div>
            </div>

        </div>
    )
}

export default DashboardHolder
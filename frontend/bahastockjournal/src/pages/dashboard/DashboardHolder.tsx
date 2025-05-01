import DashboardDisplayCardHolder from "./components/DashboardDisplayCardHolder";
import DashboardDisplayDays from "./components/DashboardDisplayDays";
import DashboardWeekly from "./pages/DashboardWeekly";
import { MdAttachMoney } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import WinningVsLosingTrades from "./pages/WinningVsLosingTrades";
import DashboardHalfCirculeCard from "./components/DashboardHalfCirculeCard";
import DashboardLineProgressBarCard from "./components/DashboardLineProgressBarCard";
import DashboardPerformanceCard from "./components/DashboardPerformanceCard";
import { useDashboardContext } from "../../contexts/DashboardContext";
import DashboardChartCard from "./components/DashboardChartCard";



const DashboardHolder = () => {



    const {
        PerformanceByDayOfWeek, PerformanceByDuration, PerformanceByPrice,
        PerformanceByHourOfDay, PerformanceByMonthOfYear,

        normalMatrices,
        dynamicPerformanceBySymbolAtr, dynamicPerformanceByInstrumentMovement,
        dynamicPerformanceByInstrumentVolume, dynamicPerformanceByInstrumentDayType,
        dynamicPerformanceByInstrumentOpeningGap,

        cumulativePnLData, winPercentagesData, cumulativeDrawdownData, dailyVolumeData, averageTradePnLData,




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
                            <DashboardChartCard title="Cumulative P&L" chartType="Line" data={cumulativePnLData} dataKey="value" />
                        </div>


                        <div className=" flex flex-col  gap-2 ">
                            <div className="flex  gap-2">
                                <WinningVsLosingTrades />

                                <DashboardLineProgressBarCard
                                    Icon={FaChartLine}
                                    title="Hold Time Winning Trades vs Losing Trades"
                                    textContent1={`${normalMatrices[11]} minutes`}
                                    textContent2={`${normalMatrices[12]} minutes`}
                                    percentStroke={100}
                                    percentTrail={100}
                                    strokeText="Winning"
                                    trailText="Losing"


                                />
                            </div>

                            <div className="flex gap-2">
                                <DashboardLineProgressBarCard
                                    Icon={FaChartLine}
                                    title="Average Winning Trade vs Losing Trade"
                                    textContent1={`$${normalMatrices[9]}`}
                                    textContent2={`$${normalMatrices[10]}`}
                                    percentStroke={100}
                                    percentTrail={100}
                                    strokeText="Winning"
                                    trailText="Losing"


                                />

                                <DashboardHalfCirculeCard
                                    percent={50}
                                    trailText={`${normalMatrices[14]}`}
                                    strokeText={`${normalMatrices[13]}`}
                                    title="Largest Gain vs Largest Loss"
                                    Icon={FaChartLine}
                                />
                            </div>

                        </div>

                    </div>



                    {/* 2nd */}
                    <div className="flex w-full gap-2">
                        <div className="flex-1">
                            <DashboardChartCard title="Win %" chartType="Bar" data={winPercentagesData} dataKey="value" />
                        </div>


                        <div className=" flex   gap-2 ">
                            <div className="flex   ">

                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Day Of Week" pagination={false} data={PerformanceByDayOfWeek} />
                            </div>

                            <div className="flex  flex-col  gap-2">
                                <DashboardHalfCirculeCard
                                    percent={75}
                                    trailText="Losing"
                                    strokeText="Winning"
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
                            <DashboardChartCard title="Cumulative Drawdown" chartType="Line" data={cumulativeDrawdownData} dataKey="value" />
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
                            <DashboardChartCard title="Daily Volume" chartType="Bar" data={dailyVolumeData} dataKey="value" />
                        </div>


                        <div className=" flex flex-col  gap-2 ">
                            <div className="flex  gap-2">

                                <DashboardDisplayCardHolder
                                    Icon={MdAttachMoney}
                                    title="Total Fees"
                                    content={`$${normalMatrices[4]}`}
                                />
                                <DashboardHalfCirculeCard
                                    percent={50}
                                    trailText="Losing"
                                    strokeText="Winning"
                                    content={`${normalMatrices[5]?.toFixed(2)}`}
                                    title="Profit Factor"
                                    Icon={FaChartLine}
                                />
                            </div>

                            <div className="flex gap-2">
                                <DashboardDisplayCardHolder
                                    Icon={FaChartLine}
                                    title="Max Consecutive Wins"
                                    content={`${normalMatrices[6]}`}
                                />

                                <DashboardDisplayCardHolder
                                    Icon={FaChartLine}
                                    title="Max Consecutive Losses"
                                    content={`${normalMatrices[7]}`}
                                />

                            </div>

                        </div>

                    </div>


                    {/* 5th */}
                    <div className="flex w-full gap-2  ">
                        <div className="flex-1">
                            <DashboardChartCard title="Average Trade P&L" chartType="Bar" data={averageTradePnLData} dataKey="value" />
                        </div>


                        <div className=" flex   gap-2 ">
                            <div className="flex   ">
                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Month Of Year" pagination={true} data={PerformanceByMonthOfYear} />
                            </div>

                            <div className="flex   ">
                                <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Symbol Atr" pagination={true} data={dynamicPerformanceBySymbolAtr} />
                            </div>

                        </div>

                    </div>

                    {/* 6th */}
                    <div className="flex w-full gap-2 justify-between ">

                        <div className="flex flex-col gap-2">
                            <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Instrument Movement" pagination={true} data={dynamicPerformanceByInstrumentMovement} />

                            <DashboardDisplayCardHolder
                                Icon={FaChartLine}
                                title="Average Daily Volume"
                                content={`${normalMatrices[8]}`}
                            />

                        </div>
                        <div className="flex flex-col gap-2">
                            <DashboardDisplayCardHolder
                                Icon={FaChartLine}
                                title="Total Number of Trades"
                                content={`${normalMatrices[15]}`}
                            />

                            <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Instrument Volume" pagination={true} data={dynamicPerformanceByInstrumentVolume} />


                        </div>



                        <div className="flex flex-col gap-2">
                            <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Instrument Opening Gap" pagination={false} data={dynamicPerformanceByInstrumentOpeningGap} />

                            {/* <DashboardDisplayCardHolder
                                Icon={MdAttachMoney}
                                title="Average Position MFE"
                                content="$ 5,280.25"
                            /> */}
                        </div>

                        <div className="flex flex-col gap-2">
                            <DashboardDisplayCardHolder
                                Icon={MdAttachMoney}
                                title="Average Position MAE"
                                content="$ -50.87 "
                            />
                            <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Instrument Day Type" pagination={false} data={dynamicPerformanceByInstrumentDayType} />


                        </div>


                    </div>

                    {/* 7th */}
                    {/* <div className="w-full flex justify-center gap-2">

                       
                        <DashboardPerformanceCard Icon={FaChartLine} title="Performance By Rvol" pagination={true} data={dynamicPerformanceByRvol} />
                    </div> */}


                </div>
            </div>

        </div>
    )
}

export default DashboardHolder
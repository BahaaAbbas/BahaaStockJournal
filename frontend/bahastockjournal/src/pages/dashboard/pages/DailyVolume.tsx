import { FaChartLine } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTheme } from "../../../contexts/ThemeContext";
import { ChartsBarPLProps } from "../../../Types/Dashboard";
import { useLayoutSidebar } from "../../../contexts/LayoutSidebarContext";



const DailyVolume = ({ data }: ChartsBarPLProps) => {

    const { theme } = useTheme();
    const { isLayoutSidebarOpen } = useLayoutSidebar();

    return (
        <div className='bgS-LD text-LD min-w-[550px] h-[328px] rounded-lg relative font-semibold '>

            {/* Icon & title */}
            <div className='flex items-center p-3 gap-1'>
                <div className=' border rounded p-1.5 text-xs'>
                    <FaChartLine className='' />
                </div>
                <p className='title-text'>Daily Volume</p>

            </div>



            {/* Content Section */}
            <div className="flex flex-col justify-start items-start gap-4 mb-2">

                <BarChart width={isLayoutSidebarOpen ? 500 : 650} height={280} data={data}>
                <CartesianGrid vertical={false} stroke={theme === 'dark' ? '#cccccc' : '#00ff2a'} strokeWidth={theme === 'dark' ? 0.1 : 0.3} />

                    <XAxis
                        dataKey="date"

                        tick={{
                           
                            fontSize: 11,
                            fontWeight: '500',
                            
                        }}
                        axisLine={false}
                        tickLine={false}
                    />


                    <YAxis

                        tick={{
                           
                            fontSize: 11,
                            fontWeight: '500',
                           
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Bar dataKey="volume" fill="#20b26c"/>
                </BarChart>





            </div>







        </div>



    )
}

export default DailyVolume
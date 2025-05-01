import { FC } from "react"
import { DashboardChartProps } from "../../../Types/Dashboard"
import { useTheme } from "../../../contexts/ThemeContext";
import { useLayoutSidebar } from "../../../contexts/LayoutSidebarContext";
import { FaChartLine } from "react-icons/fa6";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    BarChart, Bar
} from 'recharts';

const DashboardChartCard: FC<DashboardChartProps> = ({ title, chartType, data, dataKey }) => {

    const { theme } = useTheme();
    const { isLayoutSidebarOpen } = useLayoutSidebar();
    const chartWidth = isLayoutSidebarOpen ? 500 : 650;

    return (
        <div className='bgS-LD text-LD min-w-[550px] h-[328px] rounded-lg relative font-semibold'>
            {/* Icon & title */}
            <div className='flex items-center p-3 gap-1'>
                <div className='border rounded p-1.5 text-xs'>
                    <FaChartLine />
                </div>
                <p className='title-text'>{title}</p>
            </div>

            {/* Chart Section */}
            <div className="flex flex-col justify-start items-start gap-4 mb-2">
                {chartType === 'Line' ? (
                    <LineChart width={chartWidth} height={280} data={data}>
                        <CartesianGrid vertical={false} stroke={theme === 'dark' ? '#cccccc' : '#00ff2a'} strokeWidth={theme === 'dark' ? 0.1 : 0.3} />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fontWeight: '500' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fontWeight: '500' }} axisLine={false} tickLine={false} />
                        <Line type="monotone" dataKey={dataKey} stroke='#20b26c' dot={false} />
                    </LineChart>
                ) : (
                    <BarChart width={chartWidth} height={280} data={data}>
                        <CartesianGrid vertical={false} stroke={theme === 'dark' ? '#cccccc' : '#00ff2a'} strokeWidth={theme === 'dark' ? 0.1 : 0.3} />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fontWeight: '500' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fontWeight: '500' }} axisLine={false} tickLine={false} />
                        <Bar dataKey={dataKey} fill="#20b26c" />
                    </BarChart>
                )}
            </div>
        </div>
    );

}

export default DashboardChartCard
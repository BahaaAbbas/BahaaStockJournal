
import HalfCircularProgress from "../../../components/ProgressBars/HalfCircularProgress"
import { DashboardHalfCirculeCardProps } from "../../../Types/Dashboard"



const DashboardHalfCirculeCard = ({
    percent,
    strokeText,
    trailText,
    Icon,
    title,
    content
}: DashboardHalfCirculeCardProps) => {
    return (
        <div className='bgS-LD text-LD w-[250px] h-[160px] rounded-lg relative font-semibold'>

            {/* Icon & title */}
            <div className='flex items-center p-3 gap-1'>
                <div className=' border rounded p-1.5 text-xs'>
                    <Icon className='' />
                </div>
                <p className='title-text'>{title}</p>

            </div>

            {/* Profit Factor number*/}
            {
                content && (
                    <div className='absolute px-3 inline-block '>
                        <p className='text-white font-semibold'>{content}</p>
                    </div>
                )
            }


            {/* Content Section */}
            <div className="flex justify-center items-center">
                <HalfCircularProgress
                    percent={percent}
                    strokeText={strokeText}
                    trailText={trailText}

                />

            </div>



        </div>



    )
}

export default DashboardHalfCirculeCard
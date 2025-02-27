import LineProgressBar from "../../../components/ProgressBars/LineProgressBar"; 
import { DashboardLineProgressBarCardProps } from "../../../Types/Dashboard";



const DashboardLineProgressBarCard = ({

    strokeText,
    trailText,
    Icon,
    title,
    textContent1,
    textContent2,
    percentStroke,
    percentTrail
}: DashboardLineProgressBarCardProps) => {
    return (
        <div className='bgS-LD text-LD w-[250px] h-[160px] rounded-lg relative font-semibold'>

            {/* Icon & title */}
            <div className='flex items-center p-3 gap-1'>
                <div className=' border rounded p-1.5 text-xs'>
                    <Icon className='' />
                </div>
                <p className='title-text'>{title}</p>

            </div>



            {/* Content Section */}
            <div className="flex flex-col justify-center items-center">

                <div className="flex flex-col items-start">
                    <p className="">{textContent1}</p>
                    <LineProgressBar
                        percent={percentStroke}
                        Text={strokeText}
                        type="W"

                    />
                </div>

                <div className="flex flex-col items-start">
                    <p className="">{textContent2}</p>
                    <LineProgressBar
                        percent={percentTrail}
                        Text={trailText}
                        type="L"

                    />
                </div>


            </div>



        </div>



    )
}

export default DashboardLineProgressBarCard;
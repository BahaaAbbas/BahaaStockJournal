import { RiNumbersLine } from "react-icons/ri";
import CircularProgress from "../../../components/ProgressBars/CircularProgress";
import { useDashboardContext } from "../../../contexts/DashboardContext";

const WinningVsLosingTrades = () => {

    const { normalMatrices } = useDashboardContext();

    return (
        <div className='bgS-LD text-LD  min-w-[250px] h-[160px] rounded-lg relative font-semibold'>

            {/* Icon & title */}
            <div className='flex items-center p-3 gap-1'>
                <div className=' border rounded p-1.5 text-xs'>
                    <RiNumbersLine className='' />
                </div>
                <p className='title-text'>Winning vs Losing Trades</p>

            </div>

            {/* Winning vs Losing Trades chart */}
            <div className="flex justify-center items-center">
                <CircularProgress
                    percent={normalMatrices[1]}
                    strokeText={`${normalMatrices[1]}%`}
                    trailText={`${normalMatrices[3]}%`}

                />

            </div>



        </div>



    )
}

export default WinningVsLosingTrades



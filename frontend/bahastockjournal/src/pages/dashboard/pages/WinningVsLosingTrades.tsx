import { RiNumbersLine } from "react-icons/ri";
import CircularProgress from "../../../components/ProgressBars/CircularProgress"; 

const WinningVsLosingTrades = () => {


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
                percent={75} 
                strokeText="Winning"
                trailText="Losing"
                
                />

            </div>



        </div>



    )
}

export default WinningVsLosingTrades



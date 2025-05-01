import { DashboardDisplayCardHolderProps } from "../../../Types/Dashboard"


const DashboardDisplayCardHolder = ({ Icon, title, content }: DashboardDisplayCardHolderProps) => {

    return (
        <div className='totalfee bgS-LD text-LD w-[250px] h-[160px] rounded-lg relative font-semibold'>

            {/* Icon & title */}
            <div className='flex items-center p-3 gap-1'>
                <div className='  border rounded p-1.5 text-xs'>
                    <Icon className='' />
                </div>
                <p className='title-text'>{title}</p>

            </div>

            {/* Amount Fees */}
            <div className=' absolute bottom-3 left-3 '>
                <h1 className=' font-semibold text-2xl'>{content}</h1>
            </div>

        </div>



    )
}

export default DashboardDisplayCardHolder
import moment from 'moment';
import { useMemo } from 'react';
import { IoIosDocument } from "react-icons/io";
import { DashboardWeeklyTempProps } from '../../../Types/Dashboard'; 


const DashboardWeekly = () => {

    const formattedDate = moment().format('MMM YYYY');
    
   

    const weekDays = useMemo(()=> {
        const daysArray = [];
        const startOfWeek = moment().startOf('week').add(1, 'days');

        for(let i = 0; i < 7 ; i++) {
            const currentDate = startOfWeek.clone().add(i,'days');
            daysArray.push({
                day: currentDate.format('DD'),
                name: currentDate.format('ddd'),
            });

        }
        return daysArray;
    }, [])



    return (
        <div className='totalfee  bgS-LD  text-LD rounded-lg relative pb-2 font-semibold '>

            {/* Icon & title */}
            <div className='flex items-center p-3 gap-1 '>

                <p className=' text-[16px]'>{formattedDate}</p>

            </div>

            {/* weekly template */}
            <div className="flex gap-1 px-3 ">
                {weekDays.map((date, index) => (
                    <DashboardWeeklyTemp
                        key={index} 
                        title1Date={date.day}
                        title2DayName={date.name}
                        amount= {0}
                        numOfTrades={0} 
                    />
                ))}
            </div>



        </div>



    )
}

export default DashboardWeekly





const DashboardWeeklyTemp = ({ title1Date, title2DayName, amount, numOfTrades }: DashboardWeeklyTempProps) => {
    
    return (
        <div className={`hover:bg-[#f0f0f0] dark:hover:bg-[#363b52d3] border dark:border-[#3b4154] border-[#aeb5ce] cursor-pointer flex flex-col justify-between font-semibold text-LD  flex-1 min-w-[120px] h-[120px] rounded-lg relative`}>
            <div className='flex  justify-between items-center p-3 gap-1 '>
                <p className='  text-[13px]'>
                    {title1Date} <span className='text-[10px] text-[#666980]'>{title2DayName}</span>
                </p>


                <IoIosDocument className='text-[#666980]' />
            </div>

            <div className='p-3 flex flex-col -space-y-0.5 '>
                <p className='text-[#666980]  text-[12px] '>${amount}</p>
                <p className='text-[#666980]  text-[12px]'>{numOfTrades} trades</p>
            </div>

        </div>
    )
}




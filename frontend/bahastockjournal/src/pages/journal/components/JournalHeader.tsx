import moment from 'moment';

type JournalHeaderProps = {
    date: string;

};

const JournalHeader = ({ date }: JournalHeaderProps) => {

    return (
        <div>
            <div className=' text-LD rounded-md flex flex-col justify-between items-center '>
                {/* title - p&l */}
                <div className='flex items-center justify-between   w-full'>
                    <p className=' text-[14px] font-[600]'>{moment(date).format('ddd, MMM DD, YYYY')}
                    </p>

                    <div className=' '>
                        <p className='font-[500] text-[12px]  inline-block pr-2'>P&L: <span className='text-[#209058] font-[600] '>$1,555.82</span></p>
                    </div>

                </div>
                {/* custom info */}
                <div className='flex  gap-5 '>
                    {/* 1st column */}
                    <div className='flex flex-col gap-8 pb-4 pr-12 pt-2 border-r border-r-[#5e677e]'>
                        <div className=''>
                            <p className='text-[#68686c] text-[12px] font-[600]'>Total Trades</p>
                            <p className='  text-[12px]'>5</p>

                        </div>
                        <div className=''>
                            <p className='text-[#68686c]  text-[12px] font-[600]'>Total Volume</p>
                            <p className='  text-[12px]'>32800</p>

                        </div>

                    </div>

                    {/* 2nd column */}
                    <div className='flex flex-col gap-8 pb-4 pr-12 pt-2 border-r border-r-[#5e677e]'>
                        <div className=''>
                            <p className=' text-[#68686c]  text-[12px] font-[600]'>Win %</p>
                            <p className='  text-[12px]'>85%</p>

                        </div>
                        <div className=''>
                            <p className=' text-[#68686c]  text-[12px] font-[600]'>MFE/MAE Ratio</p>
                            <p className='  text-[12px]'>50%</p>

                        </div>

                    </div>

                    {/* 3rd column */}
                    <div className='flex flex-col gap-8 pb-4  pt-2 '>
                        <div className=''>
                            <p className=' text-[#68686c]  text-[12px] font-[600]'>Commissions/Fees</p>
                            <p className='  text-[12px]'>250$</p>

                        </div>
                        <div className=''>
                            <p className=' text-[#68686c]  text-[12px] font-[600]'>Net P&L</p>
                            <p className='  text-[12px]'>5230$</p>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default JournalHeader

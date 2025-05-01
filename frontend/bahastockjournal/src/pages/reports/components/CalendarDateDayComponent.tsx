import React from 'react';
import { IoIosDocument } from 'react-icons/io';

interface CalendarDateDayComponentProps {
  title1: string | number;
  amount: string;
  nTrades: string;
  additionalClass?: string;
}

const CalendarDateDayComponent: React.FC<CalendarDateDayComponentProps> = ({
  title1,
  amount,
  nTrades,

}) => {
  return (
    <div
      className={`flex flex-col justify-between cursor-pointer hover:bg-[#3e4149] border border-[#3b4154] w-[100px] h-[80px] relative `}
    >
      <div className="flex justify-between items-center p-3 gap-1">
        <p className=" text-[13px] font-semibold">{title1}</p>
        <IoIosDocument className="text-[#666980]" />
      </div>

      <div className="px-3 pb-3 flex flex-col items-start -space-y-1">
        <p
          className={`text-[12px] ${!isNaN(parseFloat(amount.replace('$', '')))
            ? parseFloat(amount.replace('$', '')) > 0
              ? 'text-green-500'
              : parseFloat(amount.replace('$', '')) < 0
                ? 'text-red-500'
                : 'text-[#5c6477]'
            : 'text-[#5c6477]'
            }`}
        >
          {amount}
        </p>      <p className="text-[#5c6477]  text-[12px]">{nTrades}</p>
      </div>
    </div>
  );
};

export default CalendarDateDayComponent;

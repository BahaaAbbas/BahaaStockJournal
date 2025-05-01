import React from 'react';
import { useReportsContext } from '../../../contexts/ReportsContext';


interface CalendarDateMonthProps {
  title: string;
  DaysOfMonth: number[];
  PnLData: string[];
}

const CalendarDateMonth: React.FC<CalendarDateMonthProps> = ({ title, DaysOfMonth, PnLData }) => {
  const weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  const { activeCalendarPress, setActiveCalendarPress, calendarTitleMonth, setCalendarTitleMonth } = useReportsContext();

  const isActive = activeCalendarPress && calendarTitleMonth === title;

  return (
    <div className='flex items-center justify-center bgS-LD w-[350px] h-[280px] rounded-lg relative'>
      <div className='w-[270px] h-[250px]'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <p className=''>{title}</p>
          <button
            onClick={() => {
              setActiveCalendarPress(true);
              setCalendarTitleMonth(title);
            }}
            className={` text-[12px] border rounded py-1 px-2 ${isActive ? 'border-[#20934c] text-[#20934c] font-bold' : ''
              } hover:text-[#20934c]`}
          >
            {isActive ? 'Active' : 'Open'}
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-1 text-center mt-2">
          {weekDays.map((day) => (
            <div key={day} className="text-xs">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1 mt-2 text-center">
          {DaysOfMonth.map((date, index) => (
            <div
              key={index}
              className={` rounded-md py-1 text-[#7c8385] text-[11px] font-semibold
                   ${PnLData[index] === 'P' ? 'bg-green-400' :
                  PnLData[index] === 'N' ? 'bg-red-400' : 'bg-gray-600'}
                `}
            >
              {date}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarDateMonth;

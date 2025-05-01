import React, { useEffect, useState } from 'react';
import CalendarDateDayComponent from './CalendarDateDayComponent';
import { TradeAPI } from '../../../common/ServerBackEnd';
import axios from 'axios';

interface CalendarFullMonthProps {
  title: string;

}

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const generateMonthDays = (year: number, month: number): number[] => {
  const daysInPrevMonth = getDaysInMonth(year, month - 1 || 12);
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const startDay = new Date(year, month - 1, 1).getDay();
  const daysArray: number[] = [];

  for (let i = startDay; i > 0; i--) {
    daysArray.push(daysInPrevMonth - i + 1);
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    daysArray.push(i);
  }

  let nextMonthDay = 1;
  while (daysArray.length % 7 !== 0) {
    daysArray.push(nextMonthDay++);
  }


  return daysArray;
};

const generateMonthDaysWithWeeks = (year: number, month: number): (number | string)[] => {
  const rawDays = generateMonthDays(year, month);
  const daysWithWeeks: (number | string)[] = [];

  rawDays.forEach((day, index) => {
    daysWithWeeks.push(day);
    if ((index + 1) % 7 === 0) {
      daysWithWeeks.push(`Week ${Math.floor(index / 7) + 1}`);
    }
  });


  return daysWithWeeks;
};

const CalendarFullMonth: React.FC<CalendarFullMonthProps> = ({ title }) => {
  const [monthName, yearString] = title.split(',');
  const year = parseInt(yearString.trim());
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
  const [calendarData, setCalendarData] = useState<{
    days: { day: number; pnl: number; count: number }[];
    weeks: { week: number; pnl: number; count: number }[];
    totalMonthPL: number;
  } | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');

  useEffect(() => {
    const fetchCurrentUserEmail = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setCurrentUserEmail(payload.email);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    };

    fetchCurrentUserEmail(); 
  }, []);

  useEffect(() => {
    const fetchCalendarMonthTrades = async () => {
      if (!currentUserEmail) return;
      const [monthName, yearString] = title.split(',');
      const year = parseInt(yearString.trim());
      const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth() + 1;

      try {
        const response = await axios({
          method: TradeAPI.CalendarMonth_Trades.method,
          url: `${TradeAPI.CalendarMonth_Trades.url}?email=${currentUserEmail}&month=${monthIndex}&year=${year}}`,
        });
        const data = response.data;

    
        console.log(data);
        setCalendarData(data);

      } catch (error) {
        console.error('Error fetching trades data:', error);
      }
    };

    fetchCalendarMonthTrades();
  }, [currentUserEmail, title]);


  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Total'];
  const daysWithWeeks = generateMonthDaysWithWeeks(year, monthIndex);

  return (
    <div className="mt-1 rounded-lg relative bgS-LD h-[580px]">
      {/* Title Section */}
      <div className="w-[800px] h-[40px] mx-auto flex items-center justify-between">
        <p className=""> {title} </p>
        <p className=" text-[#666980] m-0">
          Monthly P&L: <span className={`${calendarData?.totalMonthPL ?? 0 >= 0 ? 'text-[#1e865c]' : 'text-[#ff0000]'} font-semibold`}>${calendarData?.totalMonthPL ?? 0}</span>
        </p>
      </div>

      {/* Calendar Section */}
      <div className="w-[800px] mx-auto grid grid-cols-8 gap-0 text-center">
        {weekDays.map((day, index) => (
          <div key={index} className=" !text-[#56606b] p-1">
            {day}
          </div>
        ))}

        {daysWithWeeks.map((item, index) => {
          const dayItem = typeof item === 'number'
            ? calendarData?.days.find(d => d.day === item)
            : null;

          const weekItem = typeof item === 'string' && item.startsWith('Week')
            ? calendarData?.weeks.find(w => w.week === parseInt(item.split(' ')[1]))
            : null;



          return (
            <CalendarDateDayComponent
              key={index}
              title1={item}
              amount={dayItem ? `$${dayItem.pnl}` : weekItem ? `$${weekItem.pnl}` : ''}
              nTrades={dayItem ? `${dayItem.count} trades` : weekItem ? `${weekItem.count} trades` : ''}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarFullMonth;

import React, { useEffect, useState } from 'react';
import CalendarFullMonth from '../components/CalendarFullMonth';
import CalendarDateMonth from '../components/CalendarDateMonth';
import { useReportsContext } from '../../../contexts/ReportsContext';
import axios from 'axios';
import { TradeAPI } from '../../../common/ServerBackEnd';


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


const CalendarReportType: React.FC = () => {

  const { activeCalendarPress, calendarTitleMonth } = useReportsContext();
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [calendarData, setCalendarData] = useState<string[][]>([]);


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
    const fetchCalendarTrades = async () => {
      if (!currentUserEmail) return;

      try {
        const response = await axios({
          method: TradeAPI.Calendar_Trades.method,
          url: `${TradeAPI.Calendar_Trades.url}?email=${currentUserEmail}&year=${new Date().getFullYear()}`,
        });
        const data = response.data;


        console.log(data);
        setCalendarData(data);

      } catch (error) {
        console.error('Error fetching trades data:', error);
      }
    };

    fetchCalendarTrades();
  }, [currentUserEmail]);

  const year: number = new Date().getFullYear();

  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className='Calendar'>
      {activeCalendarPress && <CalendarFullMonth title={calendarTitleMonth} />}

      <div className='grid space-y-2 mt-2'>
        {Array.from({ length: 4 }, (_, rowIndex: number) => (
          <div key={rowIndex} className='flex justify-between '>
            {months.slice(rowIndex * 3, rowIndex * 3 + 3).map((month: string, index: number) => {
              const monthIndex = rowIndex * 3 + index + 1;
              return (
                <CalendarDateMonth
                  key={month}
                  title={`${month}, ${year}`}
                  DaysOfMonth={generateMonthDays(year, monthIndex)}
                  PnLData={calendarData[monthIndex - 1] ?? []}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarReportType;

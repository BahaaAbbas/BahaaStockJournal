import { createContext, useContext, useState } from "react";
import { ContextProviderProps, ReportsContextType } from "../Types/Contexts";

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider: React.FC<ContextProviderProps> = ({ children }) => {

    const headCustomMenuItems = [
        "Overview",
        "Detailed",
        "Win vs Loss Days",
        "Drawdown",
        "Compare",
        "Tag Breakdown",
        "Advanced",
    ];

    const headCustomReportsItems = [
        'Recent',
        'Year/Month/Day',
        'Calendar'
    ]

    const [reportsType, setReportsType] = useState<string>('Recent');

    const setReportsTypeRecent = () => {

        setReportsType('Recent');
        setActiveCalendarPress(false);
        setCalendarTitleMonth('');
    }

    const setReportsTypeYMD = () => {

        setReportsType('Year/Month/Day');
        setActiveCalendarPress(false);
        setCalendarTitleMonth('');
    }

    const setReportsTypeCalendar = () => {

        setReportsType('Calendar');

    }


    const [activeCalendarPress, setActiveCalendarPress] = useState<boolean>(false);
    const [calendarTitleMonth, setCalendarTitleMonth] = useState<string>('');


    const sampleLineData = [
        { date: '2024-11-01', value: 450 },
        { date: '2024-11-02', value: 600 },
        { date: '2024-11-03', value: 150 },
    ];

    const sampleBarData = [
        { date: '2024-11-01', value: 450 },
        { date: '2024-11-02', value: 600 },
        { date: '2024-11-03', value: 150 },
    ];



    return (
        <ReportsContext.Provider
            value={{
                headCustomMenuItems, headCustomReportsItems, reportsType,
                setReportsTypeCalendar, setReportsTypeRecent, setReportsTypeYMD,
                sampleLineData, sampleBarData,
                activeCalendarPress, setActiveCalendarPress, calendarTitleMonth, setCalendarTitleMonth

            }} >
            {children}
        </ReportsContext.Provider>
    )

}

export const useReportsContext = () => {
    const context = useContext(ReportsContext);

    if (!context) {
        throw new Error('useReportsContext must be used within a ReportsProvider');
    }

    return context;

}

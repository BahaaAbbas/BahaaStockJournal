import { ReactNode } from "react";
import { DashboardLineWithTextsProps } from "./Dashboard";

export interface AdminSidebarContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}


export interface DashboardContextType {
    comDays: string;
    setCom30Days: () => void;
    setCom60Days: () => void;
    setCom90Days: () => void;
    PerformanceByDayOfWeek: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByDuration: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByPrice: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByHourOfDay: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByInstrumentOpeningGap: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByInstrumentDayType: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByInstrumentVolume: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByMonthOfYear: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceBySymbolAtr: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByRvol: { [key: number]: DashboardLineWithTextsProps[] };
    PerformanceByInstrumentMovement: { [key: number]: DashboardLineWithTextsProps[] };
    sampleLineData: {
        date: string;
        value: number;
    }[];
    sampleBarData: {
        date: string;
        value: number;
    }[];
    dynamicPerformanceBySymbolAtr: { [key: number]: DashboardLineWithTextsProps[] };
    dynamicPerformanceByRvol: { [key: number]: DashboardLineWithTextsProps[] };
    dynamicPerformanceByInstrumentMovement: { [key: number]: DashboardLineWithTextsProps[] };
    dynamicPerformanceByInstrumentVolume: { [key: number]: DashboardLineWithTextsProps[] };
    dynamicPerformanceByInstrumentDayType: { [key: number]: DashboardLineWithTextsProps[] };
    dynamicPerformanceByInstrumentOpeningGap: { [key: number]: DashboardLineWithTextsProps[] };
    cumulativePnLData: { date: string; value: number }[];
    winPercentagesData: { date: string; value: number }[];
    cumulativeDrawdownData: { date: string; value: number }[];
    dailyVolumeData: { date: string; value: number }[];
    averageTradePnLData: { date: string; value: number }[];
    normalMatrices: number[];


}

export interface ContextProviderProps {
    children: ReactNode;
}

export interface LayoutSidebarContextType {
    isLayoutSidebarOpen: boolean;
    toggleLayoutSidebar: () => void;
}

export interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

export interface ReportsContextType {
    headCustomMenuItems: string[];
    headCustomReportsItems: string[];
    reportsType: string;
    setReportsTypeCalendar: () => void;
    setReportsTypeRecent: () => void;
    setReportsTypeYMD: () => void;
    sampleLineData: {
        date: string;
        value: number;
    }[];
    sampleBarData: {
        date: string;
        value: number;
    }[];
    activeCalendarPress: boolean;
    setActiveCalendarPress: React.Dispatch<React.SetStateAction<boolean>>;
    calendarTitleMonth: string;
    setCalendarTitleMonth: React.Dispatch<React.SetStateAction<string>>
}


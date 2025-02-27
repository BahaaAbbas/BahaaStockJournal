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
}

export interface ContextProviderProps {
    children: ReactNode;
}

export interface LayoutSidebarContextType {
    isLayoutSidebarOpen: boolean;
    toggleLayoutSidebar: () => void;
}

export interface ThemeContextType {
    theme: string,
    toggleTheme: () => void,
}


import { IconType } from "react-icons";
import { CircularProgressProps, LineProgressBarProps } from "./ProgressBars";

export interface DashboardDisplayCardHolderProps {
    Icon: IconType;
    title: string;
    content: string;
}

export interface DashboardHalfCirculeCardProps extends CircularProgressProps {
    Icon: IconType;
    title: string;
    content?: string;



}

export interface DashboardLineProgressBarCardProps {
    Icon: IconType;
    title: string;
    textContent1: string;
    textContent2: string;
    percentStroke: number;
    percentTrail: number;
    strokeText: string;
    trailText: string;


}

export interface DashboardWeeklyTempProps {
    title1Date: string;
    title2DayName: string;
    amount: number;
    numOfTrades: number;
}

export interface DashboardLineWithTextsProps extends LineProgressBarProps {
    leftText: string;
    rightPriceText: string;
    rightPercentText: string;
}

export interface DashboardButtonsProps {
    maxCount: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}


export interface ChartsLinePLProps {
    data: { date: string; cumulativePL: number }[];
}

export interface ChartsBarPLProps {
    data: { date: string; volume: number }[];
}

export type ChartType = 'Line' | 'Bar';

export interface DashboardChartProps {
    title: string;
    chartType: ChartType;
    data: { date: string; value: number }[];
    dataKey: string;
}

export interface DashboardPerformanceCardProps {
    Icon: IconType;
    title: string;
    pagination?: boolean;
    height?: string;
    data?: { [key: number]: DashboardLineWithTextsProps[] };
}

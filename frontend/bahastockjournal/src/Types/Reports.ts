export type ChartType = 'Line' | 'Bar';

export interface ReportsChartProps {
    title: string;
    chartType: ChartType;
    data: { date: string; value: number }[];
    dataKey: string;
}
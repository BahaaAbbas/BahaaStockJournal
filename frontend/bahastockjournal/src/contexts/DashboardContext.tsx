import { createContext, useContext, useState } from "react";
import { ContextProviderProps, DashboardContextType } from "../Types/Contexts";
import { DashboardLineWithTextsProps } from "../Types/Dashboard";


const DashboardContext = createContext<DashboardContextType | undefined>(undefined);


export const DashboardProvider: React.FC<ContextProviderProps> = ({ children }) => {

    const [comDays, setComDays] = useState<string>('30 Days');

    const setCom30Days = () => {
        setComDays('30 Days');
        console.log(`Dash30Days: ${comDays}`)
    }

    const setCom60Days = () => {
        setComDays('60 Days');
        console.log(`Dash60Days: ${comDays}`)
    }

    const setCom90Days = () => {
        setComDays('90 Days');
        console.log(`Dash90Days: ${comDays}`)
    }

    // Performance By Day Of Week
    const PerformanceByDayOfWeek: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "Sun", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "Mon", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "Tue", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "Wed", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "Thu", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "Fri", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "Sat", rightPriceText: "$12.37", rightPercentText: "59.85%" },

        ]
    };

    // Performance By Duration
    const PerformanceByDuration: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "Intraday", rightPriceText: "$55040.71", rightPercentText: "100.0%" },
            { percent: 20, type: "W", leftText: "Multiday", rightPriceText: "$0.0", rightPercentText: "0.0%" },
        ],
    }

    // Performance By Price
    const PerformanceByPrice: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "< $2.00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "$2 - $4.99", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "$5 - $9.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "$10 - $19.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "$20 - $49.99", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ],
        2: [
            { percent: 60, type: "W", leftText: "$50 - $99.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "$100 - $199.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "$200 - $499.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "$500 - $999.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "$1000 >", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }

    // Performance By Hour Of Day
    const PerformanceByHourOfDay: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "6:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "7:00", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "8:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "9:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "10:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "11:00", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ],
        2: [
            { percent: 40, type: "W", leftText: "12:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "13:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "14:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "15:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "16:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "17:00", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ],
        3: [
            { percent: 60, type: "W", leftText: "18:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "19:00", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "20:00", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }

    // Performance By Instrument Opening Gap
    const PerformanceByInstrumentOpeningGap: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "less than -2%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "-1% to -2%", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "0 to -1%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "0 to +1%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "+1% to +2%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "> +2%", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }

    // Performance By Instrument Day Type
    const PerformanceByInstrumentDayType: { [key: number]: DashboardLineWithTextsProps[] } = {

        1: [
            { percent: 100, type: "W", leftText: "Inside range", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "Outside range", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "Trend up", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "Trend down", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }

    // Performance By Instrument Volume
    const PerformanceByInstrumentVolume: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "0 to 49K", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "50K - 99K", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "100K - 249K", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "250K - 499K", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "500K - 1M", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "1M - 2.49M", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ],
        2: [
            { percent: 80, type: "W", leftText: "2.5M - 4.9M", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "5M - 9.9M", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "10M - 24.9M", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "25M >", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }

    // Performance By Month Of Year
    const PerformanceByMonthOfYear: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "Jan", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "Feb", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "Mar", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "Apr", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "May", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "Jun", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ],
        2: [
            { percent: 40, type: "W", leftText: "Jul", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "Aug", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "Sep", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "Oct", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "Nov", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "Dec", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }


    // Performance By Symbol Atr
    const PerformanceBySymbolAtr: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "$0.00 - $0.09", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "$0.10 - $0.24", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "$0.25 - $0.49", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "$0.50 - $0.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "$1 - $1.99", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ],
        2: [
            { percent: 60, type: "W", leftText: "$2 - $4.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "$5 - $9.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "$10 - $24.99", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "$25 >", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }


    // Performance By Rvol
    const PerformanceByRvol: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "0 - 24%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "25% - 49%", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "50% - 74%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "75% - 99%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "100% - 124%", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ],
        2: [
            { percent: 60, type: "W", leftText: "125% - 149%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "150% - 199%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "200% - 299%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "300% - 499%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "500% >", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]

    }


    // Performance By Instrument Movement
    const PerformanceByInstrumentMovement: { [key: number]: DashboardLineWithTextsProps[] } = {
        1: [
            { percent: 100, type: "W", leftText: "less than -10%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 20, type: "W", leftText: "-2% to -10%", rightPriceText: "$-3.98", rightPercentText: "19.25%" },
            { percent: 100, type: "W", leftText: "-1% to -2%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 100, type: "W", leftText: "0 to -1%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "0 to +1%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "+1% to +2%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
        ],
        2: [

            { percent: 40, type: "W", leftText: "+2% to +10%", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "> +10%", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }


    return (
        <DashboardContext.Provider value={{
            comDays,
            setCom30Days, setCom60Days, setCom90Days,
            PerformanceByDayOfWeek, PerformanceByDuration, PerformanceByPrice,
            PerformanceByHourOfDay, PerformanceByInstrumentOpeningGap, PerformanceByInstrumentDayType,
            PerformanceByInstrumentVolume, PerformanceByMonthOfYear, PerformanceBySymbolAtr,
            PerformanceByRvol, PerformanceByInstrumentMovement


        }}>
            {children}
        </DashboardContext.Provider>
    )

}

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error('useLayoutSidebar must be used within a LayoutSidebarProvider');
    }

    return context;

}
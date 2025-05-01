import { createContext, useContext, useEffect, useState } from "react";
import { ContextProviderProps, DashboardContextType } from "../Types/Contexts";
import { DashboardLineWithTextsProps } from "../Types/Dashboard";
import axios from "axios";
import { TradeAPI } from "../common/ServerBackEnd";


const DashboardContext = createContext<DashboardContextType | undefined>(undefined);


export const DashboardProvider: React.FC<ContextProviderProps> = ({ children }) => {

    const [comDays, setComDays] = useState<string>('30 Days');
    const [comDaysNumber, setComDaysNumber] = useState<number>(30);
    const [currentUserEmail, setCurrentUserEmail] = useState<string>('');

    const [normalMatrices, setNormalMatrices] = useState<number[]>([]);

    const [cumulativePnLData, setCumulativePnLData] = useState([]);
    const [winPercentagesData, setWinPercentagesData] = useState([]);
    const [cumulativeDrawdownData, setCumulativeDrawdownData] = useState([]);
    const [dailyVolumeData, setDailyVolumeData] = useState([]);
    const [averageTradePnLData, setAverageTradePnLData] = useState([]);

    const [performanceByDay, setPerformanceByDay] = useState([]);
    const [performanceByPrice, setPerformanceByPrice] = useState([]);
    const [performanceByDuration, setPerformanceByDuration] = useState([]);
    const [performanceByMonth, setPerformanceByMonth] = useState([]);
    const [performanceByHour, setPerformanceByHour] = useState([]);


    useEffect(() => {
        console.log(`comDays has been updated to: ${comDays}`);
    }, [comDays]);

    const setCom30Days = () => {
        setComDays('30 Days');

    }

    const setCom60Days = () => {
        setComDays('60 Days');

    }

    const setCom90Days = () => {
        setComDays('90 Days');
    }

    // Performance By Day Of Week
    const PerformanceByDayOfWeek: { [key: number]: DashboardLineWithTextsProps[] } = {


        1: [
            ...performanceByDay
        ]
    };

    // Performance By Duration
    const PerformanceByDuration: { [key: number]: DashboardLineWithTextsProps[] } = {

        1: [
            ...performanceByDuration
        ]
    }

    // Performance By Price
    const PerformanceByPrice: { [key: number]: DashboardLineWithTextsProps[] } = {

        1: [
            ...performanceByPrice
        ],

    }

    // Performance By Hour Of Day
    const PerformanceByHourOfDay: { [key: number]: DashboardLineWithTextsProps[] } = {


        1: [
            ...performanceByHour.slice(0, Math.ceil(performanceByHour.length / 4))
        ],
        2: [
            ...performanceByHour.slice(Math.ceil(performanceByHour.length / 4), Math.ceil(performanceByHour.length / 4) * 2)
        ],
        3: [
            ...performanceByHour.slice(Math.ceil(performanceByHour.length / 4) * 2, Math.ceil(performanceByHour.length / 4) * 3)
        ],
        4: [
            ...performanceByHour.slice(Math.ceil(performanceByHour.length / 4) * 3)
        ],

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

        ],
        2: [
            { percent: 60, type: "W", leftText: "1M - 2.49M", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "2.5M - 4.9M", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 60, type: "W", leftText: "5M - 9.9M", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 40, type: "W", leftText: "10M - 24.9M", rightPriceText: "$12.37", rightPercentText: "59.85%" },
            { percent: 80, type: "W", leftText: "25M >", rightPriceText: "$12.37", rightPercentText: "59.85%" }
        ]
    }

    // Performance By Month Of Year
    const PerformanceByMonthOfYear: { [key: number]: DashboardLineWithTextsProps[] } = {

        1: [
            ...performanceByMonth.slice(0, Math.ceil(performanceByMonth.length / 2))
        ],
        2: [
            ...performanceByMonth.slice(Math.ceil(performanceByMonth.length / 2))
        ],
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

    // Generate dynamic data
    const dynamicPerformanceBySymbolAtr = generateDynamicData(PerformanceBySymbolAtr);
    const dynamicPerformanceByRvol = generateDynamicData(PerformanceByRvol);
    const dynamicPerformanceByInstrumentMovement = generateDynamicData(PerformanceByInstrumentMovement);
    const dynamicPerformanceByInstrumentVolume = generateDynamicData(PerformanceByInstrumentVolume);
    const dynamicPerformanceByInstrumentDayType = generateDynamicData(PerformanceByInstrumentDayType);
    const dynamicPerformanceByInstrumentOpeningGap = generateDynamicData(PerformanceByInstrumentOpeningGap);



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
        switch (comDays) {
            case '30 Days':
                setComDaysNumber(30);
                break;
            case '60 Days':
                setComDaysNumber(60);
                break;
            case '90 Days':
                setComDaysNumber(90);
                break;
            default:
                setComDaysNumber(1);
        }
    }, [comDays]);

    useEffect(() => {

        const fetchOtherMatrices = async () => {
            if (!currentUserEmail) return;

            console.log(currentUserEmail)
            try {
                const response = await axios({
                    method: TradeAPI.Other_Matrices.method,
                    url: `${TradeAPI.Other_Matrices.url}?email=${currentUserEmail}&duration=${comDaysNumber}`,
                });
                const data = response.data;
                setCumulativePnLData(data.cumulativePnL);
                setWinPercentagesData(data.winPercentages);
                setCumulativeDrawdownData(data.cumulativeDrawdown);
                setDailyVolumeData(data.dailyVolume);
                setAverageTradePnLData(data.averageTradePnL);
            } catch (error) {
                console.error('Error fetching Other Matrices data:', error);
            }
        };

        fetchOtherMatrices();
    }, [currentUserEmail, comDaysNumber]);

    useEffect(() => {

        const fetchPerformanceMatrices = async () => {
            if (!currentUserEmail) return;


            try {
                const response = await axios({
                    method: TradeAPI.Performance_Matrices.method,
                    url: `${TradeAPI.Performance_Matrices.url}?email=${currentUserEmail}&duration=${comDaysNumber}`,
                });
                const data = response.data;

                setPerformanceByDay(data.performanceByDay);

                setPerformanceByPrice(data.performanceByPrice);

                setPerformanceByDuration(data.performanceByDuration);
                setPerformanceByMonth(data.performanceByMonth);
                setPerformanceByHour(data.performanceByHour);

            } catch (error) {
                console.error('Error fetching Performance Matrices data:', error);
            }
        };

        fetchPerformanceMatrices();
    }, [currentUserEmail, comDaysNumber]);

    useEffect(() => {

        const fetchNormalMatrices = async () => {
            if (!currentUserEmail) return;


            try {
                const response = await axios({
                    method: TradeAPI.Normal_Matrices.method,
                    url: `${TradeAPI.Normal_Matrices.url}?email=${currentUserEmail}&duration=${comDaysNumber}`,
                });
                const data = response.data;
                const numberArray = Object.values(data).map(Number);
                setNormalMatrices(numberArray);
                console.log(numberArray);


            } catch (error) {
                console.error('Error fetching Normal Matrices data:', error);
            }
        };

        fetchNormalMatrices();
    }, [currentUserEmail, comDaysNumber]);


    return (
        <DashboardContext.Provider value={{
            comDays,
            setCom30Days, setCom60Days, setCom90Days,
            dynamicPerformanceBySymbolAtr, dynamicPerformanceByRvol, dynamicPerformanceByInstrumentMovement,
            dynamicPerformanceByInstrumentVolume, dynamicPerformanceByInstrumentDayType,
            dynamicPerformanceByInstrumentOpeningGap,

            cumulativePnLData, winPercentagesData, cumulativeDrawdownData, dailyVolumeData, averageTradePnLData,

            normalMatrices,


            PerformanceByDayOfWeek, PerformanceByDuration, PerformanceByPrice,
            PerformanceByHourOfDay, PerformanceByInstrumentOpeningGap, PerformanceByInstrumentDayType,
            PerformanceByInstrumentVolume, PerformanceByMonthOfYear, PerformanceBySymbolAtr,
            PerformanceByRvol, PerformanceByInstrumentMovement,
            sampleLineData, sampleBarData,



        }}>
            {children}
        </DashboardContext.Provider>
    )

}

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error('useDashboardContext must be used within a DashboardProvider');
    }

    return context;

}


function generateDynamicData(originalData: { [key: number]: DashboardLineWithTextsProps[] }) {
    const updatedData: { [key: number]: DashboardLineWithTextsProps[] } = {};

    for (const key in originalData) {
        updatedData[key] = originalData[key].map(item => {
            const randomPercent = Math.floor(Math.random() * 100) + 1;
            const randomPrice = parseFloat((Math.random() * 30 - 10).toFixed(2));

            return {
                leftText: item.leftText,
                percent: randomPercent,
                type: randomPrice >= 0 ? "W" : "L",
                rightPriceText: `$${randomPrice}`,
                rightPercentText: `${randomPercent.toFixed(2)}%`
            };
        });
    }

    return updatedData;
}

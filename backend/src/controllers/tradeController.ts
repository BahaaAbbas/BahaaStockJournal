import { Request, Response } from 'express';
import { TradeModel, ITrade } from '../models/Trade.js';
import UserModel from '../models/User.js';
import moment from 'moment';

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// @desc    Crate a new trade for a user
// @route   POST /trade/create-trade
export const createTrade = async (req: Request, res: Response): Promise<void> => {
    try {

        const tradesData = req.body as Partial<ITrade>[];
        const email = req.query.email as string;

        if (!email) {
            res.status(400).json({ message: 'email is required.' });
            return;
        }


        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }


        for (const tradeData of tradesData) {
            if (
                tradeData.buyPrice == null ||
                tradeData.sellPrice == null ||
                tradeData.shares == null ||
                tradeData.commission == null
            ) {
                res.status(400).json({ message: 'buyPrice, sellPrice, shares, and commission are required.' });
                return;
            }

            if (!tradeData.entryDate || !tradeData.exitDate) {
                res.status(400).json({ message: 'entryDate and exitDate are required.' });
                return;
            }

            const formattedEntryDate = formatDate(new Date(tradeData.entryDate));
            const formattedExitDate = formatDate(new Date(tradeData.exitDate));


            const rawPnl = (tradeData.shares * (tradeData.sellPrice - tradeData.buyPrice)) - tradeData.commission;
            const pnl = Math.round(rawPnl * 100) / 100;

            await TradeModel.create({
                ...tradeData,
                email: email,
                pnl,
                entryDate: formattedEntryDate,
                exitDate: formattedExitDate,
            });
        }

        res.status(201).json({ message: 'Trades successfully created.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create trade', error });
    }
};

// @desc    return Normal Matrices for each user
// @route   GET /trade/normal-matrices
export const normalMatrices = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.query.email as string;
        const duration = parseInt(req.query.duration as string) || 1;

        if (!email) {
            res.status(400).json({ message: 'Email is required.' });
            return;
        }


        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }


        const currentDate = new Date();
        let startDate: Date;


        switch (duration) {
            case 30:

                startDate = new Date(currentDate.getTime());
                startDate.setDate(currentDate.getDate() - 30);
                break;
            case 60:

                startDate = new Date(currentDate.getTime());
                startDate.setDate(currentDate.getDate() - 60);
                break;
            case 90:

                startDate = new Date(currentDate.getTime());
                startDate.setDate(currentDate.getDate() - 90);
                break;
            case 1:
            default:

                startDate = new Date('1970-01-01');
                break;
        }


        startDate.setHours(0, 0, 0, 0);


        const endDate = new Date(currentDate.getTime());
        endDate.setHours(23, 59, 59, 999);


        const trades = await TradeModel.find({
            email,
            entryDate: { $gte: startDate },
            exitDate: { $lte: endDate },
        });


        let winningTrades = 0;
        let losingTrades = 0;
        let totalWinningPnL = 0;
        let totalLosingPnL = 0;
        let totalWinningHoldTime = 0;
        let totalLosingHoldTime = 0;
        let largestWin = -Infinity;
        let largestLoss = Infinity;

        trades.forEach((trade) => {
            if (trade.pnl > 0) {
                winningTrades++;
                totalWinningPnL += trade.pnl;
                totalWinningHoldTime += (new Date(trade.exitDate).getTime() - new Date(trade.entryDate).getTime());
                largestWin = Math.max(largestWin, trade.pnl);
            } else if (trade.pnl < 0) {
                losingTrades++;
                totalLosingPnL += trade.pnl;
                totalLosingHoldTime += (new Date(trade.exitDate).getTime() - new Date(trade.entryDate).getTime());
                largestLoss = Math.min(largestLoss, trade.pnl);
            }
        });


        const totalFees = trades.reduce((total, trade) => total + trade.commission, 0);


        let totalProfit = 0;
        let totalLoss = 0;
        trades.forEach((trade) => {
            if (trade.pnl > 0) totalProfit += trade.pnl;
            if (trade.pnl < 0) totalLoss += Math.abs(trade.pnl);
        });
        const profitFactor = totalLoss === 0 ? Infinity : totalProfit / totalLoss;

        // 4. Max Consecutive Wins
        let maxConsecutiveWins = 0;
        let currentConsecutiveWins = 0;
        trades.sort((a, b) => new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime());
        trades.forEach((trade) => {
            if (trade.pnl > 0) {
                currentConsecutiveWins++;
                maxConsecutiveWins = Math.max(maxConsecutiveWins, currentConsecutiveWins);
            } else {
                currentConsecutiveWins = 0;
            }
        });


        let maxConsecutiveLosses = 0;
        let currentConsecutiveLosses = 0;
        trades.forEach((trade) => {
            if (trade.pnl < 0) {
                currentConsecutiveLosses++;
                maxConsecutiveLosses = Math.max(maxConsecutiveLosses, currentConsecutiveLosses);
            } else {
                currentConsecutiveLosses = 0;
            }
        });


        const totalShares = trades.reduce((total, trade) => total + trade.shares, 0);


        const avgWinningPnL = winningTrades > 0 ? parseFloat((totalWinningPnL / winningTrades).toFixed(2)) : 0;
        const avgLosingPnL = losingTrades > 0 ? parseFloat((totalLosingPnL / losingTrades).toFixed(2)) : 0;



        const avgWinningHoldTime = winningTrades > 0
            ? Math.round(totalWinningHoldTime / winningTrades / (1000 * 60))
            : 0;

        const avgLosingHoldTime = losingTrades > 0
            ? Math.round(totalLosingHoldTime / losingTrades / (1000 * 60))
            : 0;


        const totalTrades = winningTrades + losingTrades;
        const winningPercentage = Math.round((winningTrades / totalTrades) * 100);
        const losingPercentage = Math.round((losingTrades / totalTrades) * 100);


        res.status(200).json({
            winningTrades,
            winningPercentage,
            losingTrades,
            losingPercentage,
            totalFees,
            profitFactor,
            maxConsecutiveWins,
            maxConsecutiveLosses,
            totalShares,
            avgWinningPnL,

            avgLosingPnL,

            avgWinningHoldTime,
            avgLosingHoldTime,
            largestWin,
            largestLoss,
            totalTrades,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get normal matrices', error });
    }
};

// @desc    Return Performance Matrices for each user
// @route   GET /trade/performance-matrices
export const performanceMatrices = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.query.email as string;
        const duration = parseInt(req.query.duration as string) || 1;

        if (!email) {
            res.status(400).json({ message: 'Email is required.' });
            return;
        }


        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }


        const currentDate = new Date();
        let startDate: Date;

        switch (duration) {
            case 30:
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 30);
                break;
            case 60:
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 60);
                break;
            case 90:
                startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - 90);
                break;
            case 1:
            default:
                startDate = new Date('1970-01-01');
                break;
        }

        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(currentDate);
        endDate.setHours(23, 59, 59, 999);


        const trades = await TradeModel.find({
            email,
            entryDate: { $gte: startDate },
            exitDate: { $lte: endDate },
        });


        if (trades.length === 0) {
            res.status(200).json({
                message: 'No trades found for this user and duration.',
                performanceByDay: [],
                performanceByPrice: [],
                performanceByDuration: [],
                performanceByMonth: [],
                performanceByHour: [],
            });
            return;
        }


        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


        const pnlByDayOfWeek: { [key: number]: number } = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        const pnlByPrice: { [key: string]: number } = {
            '<$2': 0,
            '$2-$4.99': 0,
            '$5-$9.99': 0,
            '$10-$19.99': 0,
            '$20-$49.99': 0,
            '>= $50': 0
        };
        const pnlByDuration: { [key: string]: number } = {
            Intraday: 0,
            Multiday: 0
        };
        const pnlByMonth: { [key: string]: number } = {};
        const pnlByHour: { [key: number]: number } = {};


        monthsOfYear.forEach(month => pnlByMonth[month] = 0);
        for (let i = 0; i <= 23; i++) pnlByHour[i] = 0;


        trades.forEach(trade => {
            const entry = new Date(trade.entryDate);
            const exit = new Date(trade.exitDate);

            const pnl = trade.pnl;


            pnlByDayOfWeek[entry.getDay()] += pnl;


            const price = trade.buyPrice;
            if (price < 2) pnlByPrice['<$2'] += pnl;
            else if (price >= 2 && price <= 4.99) pnlByPrice['$2-$4.99'] += pnl;
            else if (price >= 5 && price <= 9.99) pnlByPrice['$5-$9.99'] += pnl;
            else if (price >= 10 && price <= 19.99) pnlByPrice['$10-$19.99'] += pnl;
            else if (price >= 20 && price <= 49.99) pnlByPrice['$20-$49.99'] += pnl;
            else pnlByPrice['>= $50'] += pnl;


            const sameDay = entry.toDateString() === exit.toDateString();
            pnlByDuration[sameDay ? 'Intraday' : 'Multiday'] += pnl;


            pnlByMonth[monthsOfYear[entry.getMonth()]] += pnl;


            pnlByHour[entry.getHours()] += pnl;
        });


        const formatPerformance = (data: { [key: string | number]: number }, labelFn: (key: string | number) => string) => {
            const totalPnL = Object.values(data).reduce((sum, v) => sum + Math.abs(v), 0);
            return Object.entries(data).map(([key, pnl]) => {
                const percent = totalPnL === 0 ? 0 : (Math.abs(pnl) / totalPnL) * 100;
                return {
                    percent: parseFloat(percent.toFixed(2)),
                    type: pnl >= 0 ? 'W' : 'L',
                    leftText: labelFn(key),
                    rightPriceText: `$${pnl.toFixed(2)}`,
                    rightPercentText: `${percent.toFixed(2)}%`
                };
            });
        };


        const performanceByDay = formatPerformance(pnlByDayOfWeek, key => daysOfWeek[Number(key)]);
        const performanceByPrice = formatPerformance(pnlByPrice, key => key.toString());
        const performanceByDuration = formatPerformance(pnlByDuration, key => key.toString());
        const performanceByMonth = formatPerformance(pnlByMonth, key => key.toString());
        const performanceByHour = formatPerformance(pnlByHour, key => `${key}:00`);


        res.status(200).json({
            performanceByDay,
            performanceByPrice,
            performanceByDuration,
            performanceByMonth,
            performanceByHour
        });

    } catch (error) {
        console.error('Error in performanceMatrices:', error);
        res.status(500).json({ message: 'Failed to get performance matrices', error });
    }
};


// @desc    return Other Matrices for each user
// @route   GET /trade/other-matrices
export const otherMatrices = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.query.email as string;
        const duration = parseInt(req.query.duration as string) || 1;

        if (!email) {
            res.status(400).json({ message: 'Email is required.' });
            return;
        }


        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }


        const currentDate = new Date();
        let startDate: Date;


        switch (duration) {
            case 30:

                startDate = new Date(currentDate.getTime());
                startDate.setDate(currentDate.getDate() - 30);
                break;
            case 60:

                startDate = new Date(currentDate.getTime());
                startDate.setDate(currentDate.getDate() - 60);
                break;
            case 90:

                startDate = new Date(currentDate.getTime());
                startDate.setDate(currentDate.getDate() - 90);
                break;
            case 1:
            default:

                startDate = new Date('1970-01-01');
                break;
        }


        startDate.setHours(0, 0, 0, 0);


        const endDate = new Date(currentDate.getTime());
        endDate.setHours(23, 59, 59, 999);


        const trades = await TradeModel.find({
            email,
            entryDate: { $gte: startDate },
            exitDate: { $lte: endDate },
        });



        const dateMap = new Map<string, {
            totalPnL: number;
            totalShares: number;
            wins: number;
            losses: number;
            tradeCount: number;
        }>();

        trades.forEach(trade => {
            const date = new Date(trade.entryDate).toISOString().split('T')[0];

            if (!dateMap.has(date)) {
                dateMap.set(date, {
                    totalPnL: 0,
                    totalShares: 0,
                    wins: 0,
                    losses: 0,
                    tradeCount: 0
                });
            }

            const data = dateMap.get(date)!;

            data.totalPnL += trade.pnl;
            data.totalShares += trade.shares;
            data.tradeCount += 1;
            if (trade.pnl >= 0) {
                data.wins += 1;
            } else {
                data.losses += 1;
            }
        });


        const cumulativePnL: { date: string; value: number }[] = [];
        const winPercentages: { date: string; value: number }[] = [];
        const cumulativeDrawdown: { date: string; value: number }[] = [];
        const dailyVolume: { date: string; value: number }[] = [];
        const averageTradePnL: { date: string; value: number }[] = [];

        for (const [date, data] of dateMap.entries()) {
            const { totalPnL, totalShares, wins, losses, tradeCount } = data;

            if (totalPnL > 0) {
                cumulativePnL.push({ date, value: totalPnL });
            }

            if (tradeCount > 0) {
                const winRate = (wins / tradeCount) * 100;
                const loseRate = (losses / tradeCount) * 100;
                winPercentages.push({
                    date,
                    value: wins >= losses ? Math.round(winRate) : -Math.round(loseRate)
                });
            }

            if (totalPnL < 0) {
                cumulativeDrawdown.push({ date, value: totalPnL });
            }

            dailyVolume.push({ date, value: totalShares });

            if (tradeCount > 0) {
                const avgPnl = totalPnL / tradeCount;
                averageTradePnL.push({ date, value: avgPnl });
            }
        }

        const sortByDateAsc = (a: { date: string }, b: { date: string }) =>
            new Date(a.date).getTime() - new Date(b.date).getTime();

        cumulativePnL.sort(sortByDateAsc);
        winPercentages.sort(sortByDateAsc);
        cumulativeDrawdown.sort(sortByDateAsc);
        dailyVolume.sort(sortByDateAsc);
        averageTradePnL.sort(sortByDateAsc);



        res.status(200).json({

            cumulativePnL,
            winPercentages,
            cumulativeDrawdown,
            dailyVolume,
            averageTradePnL
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get other matrices', error });
    }
}


// @desc    return Weekly Entries for DASHBOARD
// @route   GET /trade/weekly-entries
export const weeklyEntries = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ message: 'Email is required.' });
            return;
        }


        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }


        const startOfWeek = moment().startOf('week').add(1, 'days');
        const endOfWeek = startOfWeek.clone().add(6, 'days');


        const trades = await TradeModel.find({
            email,
            entryDate: { $gte: startOfWeek.toDate(), $lte: endOfWeek.toDate() }
        });


        const weeklyData = [];


        for (let i = 0; i < 7; i++) {
            const currentDate = startOfWeek.clone().add(i, 'days');
            const dayOfWeek = currentDate.format('ddd');
            const dayOfMonth = currentDate.format('DD');


            const dayTrades = trades.filter((trade) =>
                moment(trade.entryDate).isSame(currentDate, 'day')
            );


            const amount = dayTrades.reduce((acc, trade) => acc + trade.pnl, 0);
            const numOfTrades = dayTrades.length;


            weeklyData.push({
                title1Date: dayOfMonth,
                title2DayName: dayOfWeek,
                amount: amount.toFixed(2),
                numOfTrades,
            });
        }


        res.status(200).json(weeklyData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get weekly entries', error });
    }
};


// @desc    return Table Trades 
// @route   GET /trade/table-trades
export const tableTrades = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        res.status(400).json({ message: 'Email query parameter is required.' });
        return;
    }

    try {
        const trades = await TradeModel.find(
            { email },
            {
                symbol: 1,
                entryDate: 1,
                shares: 1,
                buyPrice: 1,
                sellPrice: 1,
                pnl: 1,
                commission: 1,
                notes: 1,
                tags: 1,
                _id: 0,
            }
        ).lean();

        const formattedTrades = trades.map(trade => ({
            ...trade,
            entryDate: trade.entryDate ? new Date(trade.entryDate).toISOString().split('T')[0] : null
        }));

        res.status(200).json(formattedTrades);
    } catch (error) {
        console.error('Error fetching table trades:', error);
        res.status(500).json({ message: 'Failed to fetch trades.' });
    }
};

// @desc    return Searched Symbol Trades 
// @route   GET /trade/search-trades
export const searchTrades = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, symbol } = req.query;

        if (!email || !symbol) {
            res.status(400).json({ message: "Email and symbol query parameters are required." });
            return;
        }


        const trades = await TradeModel.find(
            {
                email,
                symbol: symbol.toString().toUpperCase(),
            },
            {
                symbol: 1,
                entryDate: 1,
                shares: 1,
                buyPrice: 1,
                sellPrice: 1,
                pnl: 1,
                commission: 1,
                notes: 1,
                tags: 1,
                _id: 0,
            }
        ).lean();

        let formattedTrades: any[] = trades.map(trade => ({
            ...trade,
            entryDate: trade.entryDate
                ? new Date(trade.entryDate).toISOString().split('T')[0]
                : null,
        }));

        if (formattedTrades.length === 0) {

            formattedTrades = [
                {
                    symbol: 'EMPTY',
                    entryDate: "2015-10-10T00:00:00.000+00:00",
                    shares: 0,
                    buyPrice: 0,
                    sellPrice: 0,
                    pnl: 0,
                    commission: 0,
                    notes: 'No trades found for this symbol.',
                    tags: [],
                    _id: 0,
                },
            ];
        }



        res.status(200).json(formattedTrades);
    } catch (error) {
        console.error("Error searching trades:", error);
        res.status(500).json({ message: "Server error while searching trades." });
    }
};



// @desc    return Full Calendar Months
// @route   GET /trade/calendar-trades
export const calendarYearTrades = async (req: Request, res: Response): Promise<void> => {
    const email = req.query.email as string;
    const year = parseInt(req.query.year as string);

    if (!email || isNaN(year)) {
        res.status(400).json({ message: "Email and valid year are required" });
        return;
    }

    try {
        const trades = await TradeModel.find({
            email,
            entryDate: {
                $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                $lte: new Date(`${year}-12-31T23:59:59.999Z`)
            }
        });




        const result: string[][] = Array.from({ length: 12 }, () => []);


        const dailyPnlMap: Record<string, number> = {};

        for (const trade of trades) {
            const tradeDate = new Date(trade.entryDate);
            const key = tradeDate.toISOString().split('T')[0];

            dailyPnlMap[key] = (dailyPnlMap[key] || 0) + trade.pnl;
        }


        for (let m = 0; m < 12; m++) {
            const daysInMonth = new Date(year, m + 1, 0).getDate();

            for (let d = 1; d <= daysInMonth; d++) {
                const month = (m + 1).toString().padStart(2, '0');
                const day = d.toString().padStart(2, '0');
                const key = `${year}-${month}-${day}`;

                const pnl = dailyPnlMap[key];

                if (pnl === undefined) {
                    result[m].push('X');
                } else if (pnl > 0) {
                    result[m].push('P');
                } else {
                    result[m].push('N');
                }
            }
        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error while calculating calendar trades" });
    }
};



// @desc    return  Calendar Months
// @route   GET /trade/calendarMonth-trades
export const calendarMonthsTrades = async (req: Request, res: Response): Promise<void> => {
    try {
        const { month, year, email } = req.query;

        if (!month || !year || !email) {
            res.status(400).json({ message: 'Email, month, and year are required.' });
            return;
        }

        const monthInt = parseInt(month as string);
        const yearInt = parseInt(year as string);

        const startDate = new Date(yearInt, monthInt - 1, 1);
        const endDate = new Date(yearInt, monthInt, 0);

        const trades = await TradeModel.find({
            email,
            entryDate: {
                $gte: startDate,
                $lte: new Date(yearInt, monthInt, endDate.getDate(), 23, 59, 59),
            },
        });

        const daysInMonth = endDate.getDate();
        const dayData: { [day: number]: { pnl: number; count: number } } = {};
        const weekData: { [week: number]: { pnl: number; count: number } } = {};
        let monthPL = 0;
        let monthCount = 0;


        for (let i = 1; i <= daysInMonth; i++) {
            dayData[i] = { pnl: 0, count: 0 };
        }


        const firstDay = startDate.getDay();
        const totalWeeks = Math.ceil((daysInMonth + firstDay) / 7);

        for (let i = 1; i <= totalWeeks; i++) {
            weekData[i] = { pnl: 0, count: 0 };
        }


        for (const trade of trades) {
            const date = new Date(trade.createdAt);
            const day = date.getDate();
            const week = Math.floor((day + startDate.getDay() - 1) / 7) + 1;

            dayData[day].pnl += trade.pnl;
            dayData[day].count += 1;

            weekData[week].pnl += trade.pnl;
            weekData[week].count += 1;

            monthPL += trade.pnl;
            monthCount += 1;
        }

        const daysArray = Array.from({ length: daysInMonth }, (_, i) => ({
            day: i + 1,
            pnl: dayData[i + 1].pnl,
            count: dayData[i + 1].count,
        }));

        const weeksArray = Array.from({ length: totalWeeks }, (_, i) => ({
            week: i + 1,
            pnl: weekData[i + 1].pnl,
            count: weekData[i + 1].count,
        }));

        res.status(200).json({
            email,
            month: monthInt,
            year: yearInt,
            totalMonthPL: monthPL,
            totalMonthTrades: monthCount,
            days: daysArray,
            weeks: weeksArray,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

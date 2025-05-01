import express from 'express';
import { calendarMonthsTrades, calendarYearTrades, createTrade, normalMatrices, otherMatrices, performanceMatrices, searchTrades, tableTrades, weeklyEntries } from '../controllers/tradeController.js';


const router = express.Router();

//Trade
router.post('/create-trade', createTrade);

//Trade Matrices
router.get('/normal-matrices', normalMatrices);
router.get('/performance-matrices', performanceMatrices);
router.get('/other-matrices', otherMatrices);
router.get('/weekly-entries',weeklyEntries);

router.get('/table-trades',tableTrades);
router.get('/search-trades',searchTrades);

router.get('/calendar-trades',calendarYearTrades);
router.get('/calendarMonth-trades',calendarMonthsTrades);
export default router;
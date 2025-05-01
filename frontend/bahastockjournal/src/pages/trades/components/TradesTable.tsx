import { useEffect, useState } from 'react';
import DashboardButtons from '../../dashboard/components/DashboardButtons';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { TradeAPI } from '../../../common/ServerBackEnd';
import axios from 'axios';

type SortDirection = 'asc' | 'desc' | null;

type TradesTableProps = {
    onRowClick?: (trade: any) => void;
    Symbol?: string;
};

const TradesTable = ({ onRowClick, Symbol }: TradesTableProps) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(30);
    const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
    const [tradesData, setTradesData] = useState<any[]>([]);
    const [searchTradesData, setSearchTradesData] = useState<any[]>([]);

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

    Symbol && useEffect(() => {
        const fetchSearchTrades = async () => {
            if (!currentUserEmail) return;

            try {
                const response = await axios({
                    method: TradeAPI.Search_Trades.method,
                    url: `${TradeAPI.Search_Trades.url}?email=${currentUserEmail}&symbol=${Symbol}`,
                });
                const data = response.data;


                const formattedTrades = data.map((trade: any) => ({
                    id: trade._id,
                    date: trade.entryDate ? new Date(trade.entryDate).toISOString().split('T')[0] : null,
                    symbol: trade.symbol,
                    volume: trade.shares,
                    buyPrice: trade.buyPrice,
                    sellPrice: trade.sellPrice,
                    commission: trade.commission,
                    pnl: trade.pnl,
                    notes: trade.notes,
                    tags: trade.tags.join(', '),
                }));

                setSearchTradesData(formattedTrades);
                console.log(searchTradesData);
            } catch (error) {
                console.error('Error fetching trades data:', error);
            }
        };

        fetchSearchTrades();
    }, [currentUserEmail]);

    useEffect(() => {
        const fetchTradesTable = async () => {
            if (!currentUserEmail) return;

            try {
                const response = await axios({
                    method: TradeAPI.Table_Trades.method,
                    url: `${TradeAPI.Table_Trades.url}?email=${currentUserEmail}`,
                });
                const data = response.data;


                const formattedTrades = data.map((trade: any) => ({
                    id: trade._id,
                    date: trade.entryDate ? new Date(trade.entryDate).toISOString().split('T')[0] : null,
                    symbol: trade.symbol,
                    volume: trade.shares,
                    buyPrice: trade.buyPrice,
                    sellPrice: trade.sellPrice,
                    commission: trade.commission,
                    pnl: trade.pnl,
                    notes: trade.notes,
                    tags: trade.tags.join(', '),
                }));

                setTradesData(formattedTrades);
            } catch (error) {
                console.error('Error fetching trades data:', error);
            }
        };

        fetchTradesTable();
    }, [currentUserEmail]);

    const rawData = Symbol ? searchTradesData : tradesData;

    const handleSort = (column: any) => {
        if (sortColumn === column) {

            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };


    const sortedData = [...rawData].sort((a, b) => {
        if (!sortColumn || !sortDirection) return 0;
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        const valA = typeof aVal === 'string' ? aVal.toLowerCase() : aVal;
        const valB = typeof bVal === 'string' ? bVal.toLowerCase() : bVal;

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedData.length / recordsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const renderSortIcon = (col: any) => {
        if (sortColumn !== col) return null;
        return sortDirection === 'asc' ? '▲' : '▼';
    };


    const downloadCSV = () => {
        const headers = [
            'ID', 'Date', 'Symbol', 'Volume', 'BuyPrice', 'SellPrice', 'P&L', 'Commission', 'Notes', 'Tags'
        ];
        const rows = paginatedData.map(trade => [
            trade.id, trade.date, trade.symbol, trade.volume, trade.buyPrice, trade.sellPrice,
            trade.pnl.toFixed(2), trade.commission, trade.notes, trade.tags
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');


        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'trades.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto rounded-md shadow-md border border-gray-200 dark:border-gray-600">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            {[
                                { key: 'date', label: 'Date' },
                                { key: 'symbol', label: 'Symbol' },
                                { key: 'volume', label: 'Volume' },
                                { key: 'buyPrice', label: 'buyPrice' },
                                { key: 'sellPrice', label: 'sellPrice' },
                                { key: 'pnl', label: 'P&L' },
                                { key: 'commission', label: 'commission' },
                                { key: 'notes', label: 'Notes' },
                                { key: 'tags', label: 'Tags' },
                            ].map(({ key, label }) => (
                                <th
                                    key={key}
                                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer select-none"
                                    onClick={() => handleSort(key as any)}
                                >
                                    {label}
                                    <span className="ml-1 inline-block text-xs">{renderSortIcon(key as any)}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
                        {paginatedData.map((trade) => (
                            <tr
                                key={trade.id}
                                onClick={() => onRowClick?.(trade)}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                            >
                                <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">{trade.date}</td>
                                <td className="px-4 py-3 text-sm font-medium">{trade.symbol}</td>
                                <td className="px-4 py-3 text-sm">{trade.volume}</td>
                                <td className="px-4 py-3 text-sm">{trade.buyPrice}</td>
                                <td className="px-4 py-3 text-sm">{trade.sellPrice}</td>

                                <td
                                    className={`px-4 py-3 text-sm font-semibold ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-500'}`}
                                >
                                    ${trade.pnl.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-sm">{trade.commission}</td>
                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{trade.notes}</td>
                                <td className="px-4 py-3">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                                        {trade.tags}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Controls: download CSV  + Pagination */}
            <div className="mt-4 w-full flex flex-wrap justify-end items-center gap-96">
                {/* Pagination Buttons */}
                <DashboardButtons
                    currentPage={currentPage}
                    maxCount={totalPages}
                    setCurrentPage={setCurrentPage}
                />

                {/* download CSV */}
                {
                    !Symbol && <div className='flex justify-center mb-2'>
                        <button
                            onClick={downloadCSV}
                            className={`flex items-center px-4 justify-center gap-2 bg-[#20b26c] hover:bg-teal-600 cursor-pointer py-2 rounded-lg text-white font-semibold whitespace-nowrap`}>
                            <FaCloudDownloadAlt className='inline-block' />
                            Download CSV
                        </button>
                    </div>
                }

            </div>

            {/* Show Records Dropdown */}
            <div className='flex items-center justify-end gap-2'>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Show Records:</p>
                <select
                    value={recordsPerPage}
                    onChange={(e) => {
                        setRecordsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className="border border-gray-300 dark:border-gray-700 rounded-md py-1.5 px-3 text-sm bg-white dark:bg-[#2e3446] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={30}>30</option>
                    <option value={60}>60</option>
                    <option value={90}>90</option>
                </select>
            </div>
        </div>
    );
};

export default TradesTable;

import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc' | null;

type JournalDateTableProps = {
  date: string; 
};

const JournalDateTable = ({ date }: JournalDateTableProps) => {
  const [sortColumn, setSortColumn] = useState<
    'id' | 'date' | 'symbol' | 'volume' | 'executions' | 'pnl' | 'notes' | 'tags' | null
  >(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

 
  const mockTradesForDate = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i + 1,
      date, 
      symbol: ['AAPL', 'TSLA', 'GOOGL', 'MSFT'][i % 4],
      volume: Math.floor(Math.random() * 1000),
      executions: Math.floor(Math.random() * 10) + 1,
      pnl: parseFloat((Math.random() * 200 - 100).toFixed(2)),
      notes: `Trade #${i + 1} on ${date}`,
      tags: ['swing', 'day', 'long', 'short'][i % 4],
    }));
  }, [date]);

  const sortedData = useMemo(() => {
    const data = [...mockTradesForDate];
    if (!sortColumn || !sortDirection) return data;

    return data.sort((a, b) => {
      const valA = typeof a[sortColumn] === 'string' ? a[sortColumn].toLowerCase() : a[sortColumn];
      const valB = typeof b[sortColumn] === 'string' ? b[sortColumn].toLowerCase() : b[sortColumn];
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [mockTradesForDate, sortColumn, sortDirection]);

  const handleSort = (column: keyof typeof mockTradesForDate[0]) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const renderSortIcon = (col: keyof typeof mockTradesForDate[0]) => {
    if (sortColumn !== col) return null;
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="overflow-x-auto rounded-md shadow-md border border-gray-200 dark:border-gray-600">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {[
              { key: 'date', label: 'Date' },
              { key: 'symbol', label: 'Symbol' },
              { key: 'volume', label: 'Volume' },
              { key: 'executions', label: 'Executions' },
              { key: 'pnl', label: 'P&L' },
              { key: 'notes', label: 'Notes' },
              { key: 'tags', label: 'Tags' },
            ].map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key as keyof typeof mockTradesForDate[0])}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer select-none"
              >
                {label}
                <span className="ml-1 text-xs">{renderSortIcon(key as keyof typeof mockTradesForDate[0])}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
          {sortedData.map((trade) => (
            <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <td className="px-4 py-3 text-sm">{trade.date}</td>
              <td className="px-4 py-3 text-sm">{trade.symbol}</td>
              <td className="px-4 py-3 text-sm">{trade.volume}</td>
              <td className="px-4 py-3 text-sm">{trade.executions}</td>
              <td className={`px-4 py-3 text-sm font-semibold ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                ${trade.pnl.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm">{trade.notes}</td>
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
  );
};

export default JournalDateTable;

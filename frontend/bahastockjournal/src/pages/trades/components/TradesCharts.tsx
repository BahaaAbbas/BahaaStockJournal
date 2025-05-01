// @ts-nocheck
import { useState } from 'react';
import TradesTable from './TradesTable';
import TradeChartModal from './TradeChartModal';

const TradesCharts = () => {
  const [selectedTrade, setSelectedTrade] = useState(null);

  return (
    <div className="relative">

      <TradesTable onRowClick={setSelectedTrade} />

      {selectedTrade && (
        <TradeChartModal
          trade={selectedTrade}
          onClose={() => setSelectedTrade(null)}
        />
      )}
    </div>
  );
};

export default TradesCharts;

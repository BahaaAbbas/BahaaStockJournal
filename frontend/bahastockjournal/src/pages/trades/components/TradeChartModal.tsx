type TradeChartModalProps = {
  trade: {
    symbol: string;
  };
  onClose: () => void;
};

const TradeChartModal = ({ trade, onClose }: TradeChartModalProps) => {
  const tradingViewSrc = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview-widget&symbol=${trade.symbol}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=Etc%2FUTC&withdateranges=1&hideideas=1&locale=en`;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg max-w-4xl w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 dark:text-gray-200 text-sm"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-2">TradingView Chart - {trade.symbol}</h2>

        <div className="h-[500px]">
          <iframe
            title={`TradingView Chart for ${trade.symbol}`}
            src={tradingViewSrc}
            width="100%"
            height="100%"
            allowTransparency
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TradeChartModal;

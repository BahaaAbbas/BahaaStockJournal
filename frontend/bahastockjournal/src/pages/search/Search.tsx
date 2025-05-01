import { useState } from "react";
import TradesTable from "../trades/components/TradesTable";

const Search = () => {
  const [inputSymbol, setInputSymbol] = useState("");
  const [submittedSymbol, setSubmittedSymbol] = useState<string | null>(null);

  const handleSearch = () => {
    const trimmed = inputSymbol.trim();
    if (trimmed) {
      setSubmittedSymbol(trimmed.toUpperCase());
    }
  };

  const handleClear = () => {
    setInputSymbol("");
    setSubmittedSymbol(null);
  };

  return (
    <div className="min-h-screen p-3 bgLayout-LD">
      {/* Header */}
      <div className="flex">
        <p className="text-xl font-semibold">Search</p>
      </div>

      {/* Content Holder */}
      <div className="rounded-md bgS-LD">
        <div className="flex items-center justify-center gap-2 flex-col pb-8">
          <p className="text-[12px] font-semibold py-3">
            Search your trades by Symbol Name:
          </p>

          {/* Input and Buttons */}
          <div className="flex gap-2 w-[400px] justify-center">
            <input
              value={inputSymbol}
              onChange={(e) => {
                setInputSymbol(e.target.value);
                if (e.target.value.trim() === "") {
                  setSubmittedSymbol(null);
                }
              }}
              placeholder="Enter symbol (e.g. AAPL)"
              className="border w-[250px] py-1 px-3 text-LD border-[#bcb2b7] dark:border-[#474446] dark:focus:border-transparent dark:bg-[#2e3446] bg-white rounded-md focus:outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-[#1fab68] py-2 px-3 rounded-md cursor-pointer text-white font-semibold"
            >
              Search
            </button>

            <button
              onClick={handleClear}
              className="bg-gray-400 hover:bg-gray-500 py-2 px-3 rounded-md cursor-pointer text-white font-semibold"
            >
              Clear
            </button>
          </div>

          {/* Trades Table Display */}
          {submittedSymbol && (
            <div className="w-full mt-6">
              <TradesTable Symbol={submittedSymbol} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

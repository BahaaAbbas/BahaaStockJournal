import axios from "axios";
import { useEffect, useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa"
import { TradeAPI } from "../../common/ServerBackEnd";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';

const Imports = () => {


  const [pastedData, setPastedData] = useState("");
  const [active, setActive] = useState<string>('standard');
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [csvData, setCsvData] = useState<any[]>([]);

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



  const handleImportTrades = async () => {

    const parsedTrades = parsePastedData(pastedData);


    console.log("Parsed Trades:", parsedTrades);

    if (parsedTrades.length > 0 && currentUserEmail) {
      try {

        const response = await axios({
          method: TradeAPI.Create_Trade.method,
          url: `${TradeAPI.Create_Trade.url}?email=${currentUserEmail}`,
          data: parsedTrades,
        });


        toast.success(`Trades imported successfully: ${response.data.message}`);

        setPastedData("");
      } catch (error) {
        console.error('Error fetching trades data:', error);
      }
    }
    else {
      toast.error(`False Trade Format: Please Follow the format!`);
    }


  };



  const parsePastedData = (data: string) => {

    const lines = data.trim().split("\n");


    const trades = lines.map((line) => {
      const values = line.split(/\s+/);


      if (values.length < 7) return null;


      const notesMatch = values.slice(7).join(" ").match(/%([^%]+)%/);
      const notes = notesMatch ? notesMatch[1] : "";


      const tagsMatch = values.slice(7).join(" ").match(/#([^#]+)#/);
      const tags = tagsMatch ? tagsMatch[1].split(",").map(tag => tag.trim()) : [];


      const trade = {
        symbol: values[0].toUpperCase(),
        entryDate: values[1],
        exitDate: values[2],
        shares: parseInt(values[3], 10),
        buyPrice: parseFloat(values[4]),
        sellPrice: parseFloat(values[5]),
        commission: parseFloat(values[6]),
        notes: notes,
        tags: tags,
      };

      return trade;
    }).filter(Boolean);

    return trades;
  };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvContent = e.target?.result as string;

        Papa.parse(csvContent, {
          complete: (result) => {

            const trades = parseCsvData(result.data);
            setCsvData(trades);
            console.log("Parsed CSV Trades:", trades);


          },
          header: false,
          skipEmptyLines: true,
        });
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid CSV file.");
    }
  };

  useEffect(() => {
    if (csvData.length > 0) {
      UploadCSVDB();
    }
  }, [csvData]);

  const UploadCSVDB = async () => {

    if (csvData.length > 0 && currentUserEmail) {
      try {

        const response = await axios({
          method: TradeAPI.Create_Trade.method,
          url: `${TradeAPI.Create_Trade.url}?email=${currentUserEmail}`,
          data: csvData,
        });


        toast.success(`Trades imported successfully: ${response.data.message}`);

      } catch (error) {
        console.error('Error fetching trades data:', error);
      }
    }
    else {
      toast.error(`False Trade Format: Please Follow the format!`);
    }

  }


  const parseCsvData = (data: any[]) => {
    return data.map((row: any) => {
      if (row.length < 7) return null;

      const notesMatch = row.slice(7).join(" ").match(/%([^%]+)%/);
      const notes = notesMatch ? notesMatch[1] : "";

      const tagsMatch = row.slice(7).join(" ").match(/#([^#]+)#/);
      const tags = tagsMatch ? tagsMatch[1].split(",").map((tag: string) => tag.trim()) : [];

      return {
        symbol: row[0].toUpperCase(),
        entryDate: row[1],
        exitDate: row[2],
        shares: parseInt(row[3], 10),
        buyPrice: parseFloat(row[4]),
        sellPrice: parseFloat(row[5]),
        commission: parseFloat(row[6]),
        notes,
        tags,
      };
    }).filter(Boolean);
  };

  return (
    // for page
    <div className=" min-h-screen p-3 bgLayout-LD text-LD ">
      {/* for title and header page */}
      <div className="flex flex-col items-start space-y-2 mb-4">

        <p className="text-xl  font-semibold">Import trades</p>

        {/* button standard */}
        <div className='border border-[#3F4559] w-fit  p-1 rounded bg-[#e9ecf2] dark:bg-[#1d2333] flex gap-3'>
          <button
            onClick={() => setActive('standard')}
            className={`title-text py-1 px-2 rounded    cursor-pointer
              ${active === 'standard' ? 'bg-[#ffffff] dark:bg-[#505669]' : 'bg-[#e9ecf2] dark:bg-[#2e3446]'}
              
              `}

          >
            Standard Import
          </button>


        </div>

      </div>

      {/* for page content holder */}
      <div className="  rounded-md   w-[800px] ">

        {/* for page content itself */}
        <div className="flex justify-start   ">
          {/* options for import */}
          <div className=" bg-white dark:bg-[#1d2333]  p-6 rounded-md space-y-6  w-full   mx-auto">
            {/* Option 1: File Upload */}
            <div>
              <h3 className="text-sm font-medium mb-3 ">Option 1: Import from a File</h3>
              <div className="border-2 border-dashed border-gray-600 hover:border-gray-400 p-6 rounded-md flex flex-col items-center justify-center bg-white dark:bg-[#2e3446] ">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <div className="text-3xl mb-2">
                    <i className="fas fa-cloud-upload-alt"></i> {/* FontAwesome Icon */}
                  </div>
                  <span className='rounded-full bg-[#585c69] p-3'><FaCloudDownloadAlt className='text-[#6e7077]' /></span>
                  <span className="text-lg font-medium  ">Upload file</span>
                  <span className="text-sm  text-gray-400">
                    Drag and drop the .csv file here or{" "}
                    <span className="text-[#3cc482] font-[600] ">click to upload</span>
                  </span>
                </label>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {/* Option 2: Paste Data */}
            <div>
              <h3 className="text-sm font-medium mb-3 ">Option 2: Paste Data Here</h3>
              <textarea
                value={pastedData}
                onChange={(e) => setPastedData(e.target.value)}
                placeholder={`PASTE ONLY VALUES WITH SPACE, Following below format!\nSymbol  entryDate  exitDate  Shares  buyPrice  sellPrice  commission  %note(Optinal)%  #tags(Optinal)#\n TSLA 2025-03-12 2025-03-15 200 250 320 2 %Good Trade% #swing,day#`}
                className="w-full h-40 p-3 bg-white dark:bg-[#2e3446] text-gray-600 dark:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border focus:border-0 border-gray-600 hover:border-gray-400"
              />
              <button
                onClick={handleImportTrades}
                className="mt-1 w-full bg-white dark:bg-[#2e3446] border-gray-400  py-2 px-4 rounded-md hover:bg-blue-500 border hover:border-0  hover:border-gray-400"
              >
                Import trades
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Imports

import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa"


const Imports = () => {


  const [pastedData, setPastedData] = useState("");
  const [active , setActive] = useState<string>('standard');



  const handleImportTrades = () => {
      console.log("Pasted Data:", pastedData);
      // Handle import trades logic here
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
          onClick={()=>setActive('standard')}
            className={`title-text py-1 px-2 rounded    cursor-pointer
              ${active === 'standard'? 'bg-[#ffffff] dark:bg-[#505669]':'bg-[#e9ecf2] dark:bg-[#2e3446]'}
              
              `}
            


          >
            Standard Import
          </button>
          <button
            onClick={() => setActive('trading')}
            className={`title-text py-1 px-2 rounded   cursor-pointer
              ${active === 'trading'? 'bg-[#ffffff] dark:bg-[#505669]':'bg-[#e9ecf2] dark:bg-[#2e3446]'}
              `}

              


          >
            TradingView
          </button>

        </div>

      </div>

      {/* for page content holder */}
      <div className="  rounded-md   w-[600px] ">

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
                  onChange={()=>console.log('asda')}
                />
              </div>
            </div>

            {/* Option 2: Paste Data */}
            <div>
              <h3 className="text-sm font-medium mb-3 ">Option 2: Paste Data Here</h3>
              <textarea
                value={pastedData}
                onChange={(e) => setPastedData(e.target.value)}
                placeholder="Paste data"
                className="w-full h-20 p-3 bg-white dark:bg-[#2e3446] text-gray-600 dark:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border focus:border-0 border-gray-600 hover:border-gray-400"
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

    </div>
  )
}

export default Imports

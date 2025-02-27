
const Search = () => {
  return (
    // for page
    <div className=" h-screen p-3 bgLayout-LD  ">
      {/* for title and header page */}
      <div className="flex ">

        <p className="text-xl  font-semibold">Search</p>

      </div>

      {/* for page content holder */}
      <div className=" rounded-md  bgS-LD ">

        {/* for page content itself */}
        <div className="flex items-center justify-center gap-2 flex-col pb-8">
          <p className="text-[12px]  font-semibold py-3">
            Search your trade notes, journal notes, and comments made on your trades/notes:
          </p>

          {/* input search, button */}
          <div className=' flex gap-1 w-[400px] justify-center'>
            <input
              className="border w-[250px] py-1 px-3 text-LD border-[#bcb2b7] dark:border-[#474446] dark:focus:border-transparent dark:bg-[#2e3446] bg-white rounded-md focus:outline-none "
            />

            <button className='title-text bg-[#1fab68] py-2 px-3 rounded-md  cursor-pointer'>Search</button>

          </div>

          {/* filter */}
          <div className='flex gap-2 '>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="option"
                value="trades"
                className="hidden peer "
              />
              <span className="w-4 h-4 rounded-full border-2 border-[#858c9a] peer-checked:border-green-500 peer-checked:bg-green-500 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white "></span>
              </span>
              <span className="title-text !text-[10px]">Trades</span>
            </label>


            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="option"
                value="trades"
                className="hidden peer"
              />
              <span className="w-4 h-4 rounded-full border-2 border-[#858c9a] peer-checked:border-green-500 peer-checked:bg-green-500 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white "></span>
              </span>
              <span className="title-text !text-[10px]">Journal entries </span>
            </label>



            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="option"
                value="trades"
                className="hidden peer"
              />
              <span className="w-4 h-4 rounded-full border-2 border-[#858c9a] peer-checked:border-green-500 peer-checked:bg-green-500 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white "></span>
              </span>
              <span className="title-text !text-[10px]">Comments</span>
            </label>


          </div>

        </div>

      </div>

    </div>
  )
}

export default Search

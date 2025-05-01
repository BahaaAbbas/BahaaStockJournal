import { Datepicker } from "flowbite-react";


const JournalSide = () => {
    return (
        <div>
            {/* 1-Entry */}
            <div className=" bgS-LD py-2 px-3 rounded-md space-y-2">

                <p className="text-[12px]  font-semibold ">
                    Create New Journal Entry
                </p>

                <Datepicker minDate={new Date(2023, 0, 1)} maxDate={new Date(2025, 4, 30)} />

            </div>

            <button className={` mt-3 cursor-pointer  py-2 rounded-lg text-[12px]  border font-[700] border-[#3b4154] 
                     px-4 hover:bg-HoverSide-dark
        `}>

                Create
            </button>


        </div>
    )
}

export default JournalSide

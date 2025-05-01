import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { FaCheck, FaCalendar } from "react-icons/fa6";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
const ReportsHeader = () => {

    const { theme } = useTheme();
    const [showPicker, setShowPicker] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const pickerRef = useRef<HTMLDivElement>(null);

    const handleSelect = (ranges: RangeKeyDict) => {
        const { startDate, endDate } = ranges.selection;
        setSelectionRange({ ...selectionRange, startDate, endDate });
        console.log("Selected:", startDate, endDate);
        setShowPicker(false);
    };

    const formattedRange = `${selectionRange.startDate.toLocaleDateString()} - ${selectionRange.endDate.toLocaleDateString()}`;


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='flex justify-between  '>
            <div className='w-[600px] flex gap-3 '>
                <div className=' w-[120px]  '>
                    <p className='title-text'>Symbol</p>
                    <input
                        className='rounded-md focus:outline-2 focus:outline-[#7aba77]     dark:bg-[#2e3446] bg-[#ffffff]  w-[120px] h-[32px] p-2'
                        type='text'
                        name='symbol'
                        placeholder='Symbol'
                    />

                </div>

                <div className='w-[120px]'>
                    <p className='title-text'>Tags</p>
                    <div className="relative">
                        <select
                            className='rounded-md title-text w-full focus:outline-2 focus:outline-[#7aba77] 
                dark:bg-[#2e3446] bg-[#ffffff] p-2 appearance-none cursor-pointer pr-8'
                            defaultValue='Select'
                        >
                            <option value="Select" disabled hidden>
                                Select
                            </option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>


                        <span className='absolute inset-y-0 right-2 flex items-center pointer-events-none text-[#586072]'>
                            <IoIosArrowDown />
                        </span>
                    </div>
                </div>



                <div className='w-[120px]'>
                    <p className='title-text'>Side</p>
                    <div className="relative">
                        <select
                            className='rounded-md title-text w-full focus:outline-2 focus:outline-[#7aba77] 
                dark:bg-[#2e3446] bg-[#ffffff] p-2 appearance-none cursor-pointer pr-8'
                            defaultValue='Select'
                        >
                            <option value="Select" disabled hidden>
                                Select
                            </option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>


                        <span className='absolute inset-y-0 right-2 flex items-center pointer-events-none text-[#586072]'>
                            <IoIosArrowDown />
                        </span>
                    </div>
                </div>

                <div className='w-[120px]'>
                    <p className='title-text'>Duration</p>
                    <div className="relative">
                        <select
                            className='rounded-md title-text w-full focus:outline-2 focus:outline-[#7aba77] 
                dark:bg-[#2e3446] bg-[#ffffff] p-2 appearance-none cursor-pointer pr-8'
                            defaultValue='Select'
                        >
                            <option value="Select" disabled hidden>
                                Select
                            </option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>


                        <span className='absolute inset-y-0 right-2 flex items-center pointer-events-none text-[#586072]'>
                            <IoIosArrowDown />
                        </span>
                    </div>
                </div>

            </div>

            <div className="w-[400px] flex items-center justify-end gap-6 mt-2">

                {/* Date Range Picker */}
                <div className="relative" ref={pickerRef}>
                    {/* Input with icon */}
                    <div
                        className="flex items-center gap-2 border border-gray-300 dark:border-[#3b4154] rounded-md bg-white dark:bg-[#2e3446] px-3 py-1 cursor-pointer w-[240px]"
                        onClick={() => setShowPicker((prev) => !prev)}
                    >
                        <FaCalendar className="text-gray-400" />
                        <input
                            type="text"
                            readOnly
                            className="bg-transparent outline-none w-full text-sm "
                            value={formattedRange}
                        />
                    </div>

                    {/* Floating calendar */}
                    {showPicker && (
                        <div className={`absolute z-50 -left-60 mt-3 shadow-lg border ${theme && 'text-[#000000]'}`}>
                            <DateRangePicker
                                ranges={[selectionRange]}
                                onChange={handleSelect}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={1}
                                direction="horizontal"
                                rangeColors={["#7aba77"]}
                            />
                        </div>
                    )}
                </div>

                {/* Delete Button */}
                <div className="dark:bg-[#2e3446] bg-[#ffffff] rounded-md w-[36px] h-[36px] p-2 cursor-pointer flex justify-center items-center">
                    <MdOutlineDelete className="text-[#586072] text-[18px]" />
                </div>

                {/* Check Button */}
                <div className="dark:bg-[#1a7c54]  bg-[#69c99e]  rounded-md w-[36px] h-[36px] p-2 cursor-pointer flex justify-center items-center">
                    <FaCheck className="text-[#90a4a1] text-[18px]" />
                </div>
            </div>



        </div>
    )
}

export default ReportsHeader
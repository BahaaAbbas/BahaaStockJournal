
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
import { BsJournalText } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCloudDownloadAlt } from "react-icons/fa"; 
import { useLayoutSidebar } from '../contexts/LayoutSidebarContext';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../assets/logo.png';
import { Sun, Moon, User } from "lucide-react";
import { useReportsContext } from '../contexts/ReportsContext';


const MenuWordIcons = [

    { word: 'Dashboard', icon: <AiFillHome /> },
    { word: 'Calendar', icon: <FaCalendarAlt /> },
    { word: 'Reports', icon: <FaChartSimple /> },
    { word: 'Trades', icon: <FaChartLine /> },
    { word: 'Journal', icon: <BsJournalText /> },
    { word: 'Search', icon: <FaSearch /> },

]


const LayoutSideBar = () => {

    const { isLayoutSidebarOpen, toggleLayoutSidebar } = useLayoutSidebar();
    const { theme, toggleTheme } = useTheme();
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
    const navigate = useNavigate();
    const { setReportsTypeCalendar, setReportsTypeRecent } = useReportsContext();
    const [activeMenu, setActiveMenu] = useState<string>("dashboard");



    useEffect(() => {
        const fetchCurrentUser = () => {

            try {

                const token = localStorage.getItem('token');

                if (token) {

                    const payload = JSON.parse(atob(token.split('.')[1]));

                    setCurrentUserEmail(payload.email);


                }

            } catch (error) {

                console.error('Failed to set current user:', error);

            }

        };
        fetchCurrentUser();


    }, [])

    return (

        <div className='flex  '>
            <div className={`${isLayoutSidebarOpen ? 'w-[230px]  ' : '  w-[80px] flex justify-center'} h-screen fixed top-0 left-0 py-3 ml-2 duration-300 rounded`}>

                <aside className={` bgS-LD  ${isLayoutSidebarOpen ? 'p-4' : 'p-2  '}  rounded-lg`}>
                    {/* Logo & Arrow */}
                    <div className='flex justify-center items-center mb-2'>
                        {
                            isLayoutSidebarOpen && (
                                <Link to={'/'}>
                                    <img src={Logo} alt='BahaaJournalStock' width={180} height={180} />
                                </Link>

                            )
                        }


                        {/* Arrow Container */}
                        <div className={`rounded p-2 cursor-pointer flex justify-center items-center 
                        ${theme === 'light' && 'bg-[#dfe5ee]'}
                        ${theme === 'dark' && 'bg-[#2e3446]'}
                        `}
                            onClick={() => {

                                toggleLayoutSidebar();
                            }}
                        >
                            {
                                !isLayoutSidebarOpen ? (
                                    <IoIosArrowForward className={`text-LD text-2xl items-center  `} />
                                ) :
                                    (
                                        <IoIosArrowBack className='text-LD text-2xl' />
                                    )
                            }

                        </div>

                    </div>

                    {/*  Horizontal Line */}
                    <hr className={` border-[#c4c4c9] dark:border-[#3b4154]  border-t-[1px] mb-4 `} />

                    {/* Menu Section */}
                    <div className='mb-14 flex flex-col gap-5 cursor-pointer font-semibold '>
                        {MenuWordIcons.map((item, index) => {

                            const isActive = activeMenu === item.word.toLowerCase();

                            return (
                                <div
                                    key={index}

                                    onClick={

                                        () => {
                                            if (item.word.toLowerCase() === "calendar") {
                                                setActiveMenu("calendar");
                                                setReportsTypeCalendar();
                                                navigate("/reports");
                                            } else if (item.word.toLowerCase() === "reports") {
                                                setActiveMenu("reports");
                                                setReportsTypeRecent();
                                                navigate("/reports");
                                            } else {
                                                setActiveMenu(item.word.toLowerCase());
                                                navigate(`/${item.word.toLowerCase()}`);
                                            }
                                        }
                                    }


                                    className={` relative  group flex  text-LD gap-3 p-2 rounded-lg transition-all duration-300 
                                       ${isActive && isLayoutSidebarOpen && 'bgActiveOpenSidebar-LD'}
                                       ${isActive && !isLayoutSidebarOpen && 'bgActiveOpenSidebar-LD'}
                                       ${!isActive && isLayoutSidebarOpen && 'bgHoverActiveOpenSidebar-LD'}
                                       ${!isActive && !isLayoutSidebarOpen && 'bgHoverActiveOpenSidebar-LD'}
                                       ${!isLayoutSidebarOpen ? 'justify-center' : ''}
                                        



`
                                    }

                                >
                                    <span className={`text-xl ${isActive ? 'text-[#259863]' : 'text-[#cbc9ca]'}`}>
                                        {item.icon}
                                    </span>
                                    {isLayoutSidebarOpen && item.word}

                                    {/* Tooltip when sidebar is collapsed */}
                                    {!isLayoutSidebarOpen && (
                                        <span className="absolute -left-2 top-9 bgLayout-LD  text-LD text-sm px-2 py-1 rounded-md opacity-0
group-hover:opacity-100 transition-opacity  whitespace-nowrap 
">
                                            {item.word}
                                        </span>
                                    )}

                                </div>
                            );
                        })}
                    </div>

                    {/* import button */}
                    <div className='flex justify-center mb-2 '>
                        <button
                            onClick={() => navigate('/import')}
                            className={`flex items-center gap-2 bg-[#20b26c] hover:bg-teal-600 cursor-pointer py-2 rounded-lg text-white font-semibold  whitespace-nowrap
${!isLayoutSidebarOpen ? 'px-4 justify-center' : 'px-6'}
`}>
                            <FaCloudDownloadAlt className='inline-block' />
                            {isLayoutSidebarOpen && 'Import Trades'}
                        </button>
                    </div>


                    {/*  Horizontal Line */}
                    <hr className='border-[#c4c4c9] dark:border-[#3b4154]   border-t-[1px] mb-4 ' />


                    {/* user icon and name */}
                    {/* User Section */}
                    <div className={`  rounded-md flex items-center ${isLayoutSidebarOpen ? 'justify-between text-LD bg-LD' : 'justify-center'} py-3 px-2 gap-3`}>
                        {/* User Info */}
                        {isLayoutSidebarOpen && (
                            <div className="flex items-end  gap-2 p-2 rounded-lg">
                                <User className="w-8 h-8 " />
                                <span className="font-semibold ">
                                    {currentUserEmail ? currentUserEmail.substring(0, 2).toUpperCase() : 'BA'}
                                </span>
                            </div>
                        )}

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-lg transition-all duration-300 cursor-pointer 
                        ${theme === 'light' && 'hover:bg-[#3e424b]'}
                        ${theme === 'dark' && ' hover:bg-[#5f728f]'}`}>
                            {theme === 'light' ? <Sun className="text-yellow-400 w-8 h-8" /> : <Moon className="text-gray-300 w-8 h-8" />}
                        </button>
                    </div>



                </aside>
            </div>

        </div>
    )
}

export default LayoutSideBar

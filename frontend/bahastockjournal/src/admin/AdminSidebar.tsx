import { BsFillPostcardFill } from 'react-icons/bs';
import { TbBrandAppleArcade } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa';
import { IoIosTrendingUp, IoIosHome } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png'
import { useSidebar } from '../contexts/AdminSidebarContext';
import { useTheme } from '../contexts/ThemeContext';


const adminNavItems = [
    { to: '/admin/welcome', icon: <IoIosHome className='text-2xl' />, label: 'Dashboard Home' },
    { to: '/admin/users', icon: <FaUsers className='text-2xl' />, label: 'Manage Users' },
    { to: '/admin/stats', icon: <BsFillPostcardFill className='text-2xl' />, label: 'Summary' },
    { to: '/admin/apps', icon: <TbBrandAppleArcade className='text-2xl' />, label: 'Applications' },
];


const lastMenuItems = [
    { to: '/', icon: <IoIosHome className='text-2xl' />, label: 'Main Home' },
    { to: '/dashboard', icon: <IoIosTrendingUp className='text-2xl' />, label: 'Trading Dashboard' },

];




const AdminSidebar = () => {

    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const { theme, toggleTheme } = useTheme();


    return (
        <div className='flex  '>
            <div className={`${isSidebarOpen ? 'w-[250px] overflow-y-auto' : 'w-[100px]'} dark:bg-purple-300 bg-[#86e5b6] h-screen fixed top-0 left-0 p-5 md:block hidden pt-8 duration-300 rounded`}>
                <div className='flex  items-center'>
                    <img
                        onClick={toggleSidebar} src={Logo} alt=''

                        className={`cursor-pointer h-[90px] object-contain max-w-full duration-500 ${isSidebarOpen && 'rotate-[360deg]'}`}

                    />

                </div>



                {/* navlinks */}
                {/* Admin roles */}
                {
                    <ul className={`pt-6 ${!isSidebarOpen && 'flex flex-col justify-center items-center'}  `}>
                        <p className={`ml-3 uppercase text-gray-500 ${!isSidebarOpen && 'hidden'}`}><small>MENU</small></p>
                        {
                            adminNavItems.map((menuIte, index) => (
                                <li className='mb-2' key={index}>
                                    <NavLink to={menuIte.to}
                                        className={({ isActive }) =>
                                            `flex ${(isActive || (menuIte.to === '/admin/welcome' && window.location.pathname === '/admin')) ?
                                                'bg-red-500 text-white' :
                                                'text-[#413F44]'}
                                        duration-150 rounded-md p-2 cursor-pointer hover:bg-blue-500 hover:text-white font-bold text-sm items-center gap-x-4
                                        group relative 
                                        
                                    `
                                        }>
                                        {menuIte.icon}
                                        <span className={`${!isSidebarOpen && 'hidden'} origin-left duration-200 `}>{menuIte.label}</span>


                                        {!isSidebarOpen && (
                                            <span className="absolute -left-7 -top-8 bg-gray-700  text-black text-sm px-2 py-1 rounded-md opacity-0
                   group-hover:opacity-100 transition-opacity w-auto   z-100 pointer-events-none
                  ">
                                                {menuIte.label.split(' ')[0]}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                }




                <ul className={`pt-10 ${!isSidebarOpen && 'flex flex-col justify-center items-center'}`}>

                    <p className={`ml-3 text-gray-500 ${!isSidebarOpen && 'hidden'} uppercase`}><small>Useful Links</small></p>

                    {


                        lastMenuItems.map((menuIte, index) => (
                            <li className='mb-2' key={index}>
                                <NavLink to={menuIte.to}
                                    className={({ isActive }) =>
                                        `flex ${isActive ? 'bg-red-500 text-white' : 'text-[#413F44]'}
                                        duration-150 rounded-md p-2 cursor-pointer hover:bg-blue-500 hover:text-white font-bold text-sm items-center gap-x-4
                                             group relative 
                                    `
                                    }>
                                    {menuIte.icon}
                                    <span className={`${!isSidebarOpen && 'hidden'} origin-left duration-200 `}>{menuIte.label}</span>


                                    {!isSidebarOpen && (
                                        <span className="absolute -left-7 -top-8 bg-gray-700  text-black text-sm px-2 py-1 rounded-md opacity-0
                   group-hover:opacity-100 transition-opacity w-auto   z-100 pointer-events-none
                  ">
                                            {menuIte.label.split(' ')[0]}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        ))


                    }


                </ul>



                {/* Theme Toggle Button */}
                <div className="flex justify-center pt-4  mt-8 ">
                    <button
                        onClick={toggleTheme}
                        className="bg-gray-500 text-white p-2 rounded-md transition-all duration-300 hover:bg-gray-700"
                    >
                        {theme === 'dark' ? '🌙 Dark' : '🌞 Light'}
                    </button>
                </div>



            </div>





        </div>
    )
}

export default AdminSidebar

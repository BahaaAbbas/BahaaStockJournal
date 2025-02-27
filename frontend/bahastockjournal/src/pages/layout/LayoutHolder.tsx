import { Outlet } from 'react-router-dom'
import LayoutSideBar from '../../components/LayoutSideBar'
import { useLayoutSidebar } from '../../contexts/LayoutSidebarContext'


const LayoutHolder = () => {

    const { isLayoutSidebarOpen } = useLayoutSidebar();

    return (
        <div className="flex  text-LD bgLayout-LD ">

            <div className={` ${isLayoutSidebarOpen ? 'w-[300px]' : 'w-[100px]'}  `} >
                <LayoutSideBar />
            </div>

            <div className="w-full  ml-2 ">
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutHolder

import { Outlet } from "react-router-dom";
import { useSidebar } from "../contexts/AdminSidebarContext";
import AdminSidebar from "./AdminSidebar"

const AdminHolder = () => {

    const { isSidebarOpen } = useSidebar();

    return (
        <div className="flex  text-LD bgS-LD ">

            <div className={` ${isSidebarOpen ? 'w-[320px]' : 'w-[150px]'}   `} >
                <AdminSidebar />
            </div>

            <div className="w-full  ml-2 ">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminHolder

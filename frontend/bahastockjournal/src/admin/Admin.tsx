
import { SidebarProvider } from '../contexts/AdminSidebarContext';
import AdminHolder from './AdminHolder';

const Admin = () => {

    return (
        <SidebarProvider>
            <AdminHolder />
        </SidebarProvider>
    );
}

export default Admin

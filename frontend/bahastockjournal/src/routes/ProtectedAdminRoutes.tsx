import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserAPI } from '../common/ServerBackEnd'; 

interface ProtectedAdminRouteProps {
    children: React.ReactNode;
}


const ProtectedAdminRoutes: React.FC<ProtectedAdminRouteProps> = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminRole = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('No token found. Please log in.');
                    navigate('/login');
                    return;
                }

                const response = await axios({
                    method: UserAPI.User_Role_EMAIL.method,
                    url: UserAPI.User_Role_EMAIL.url,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })



                if (response.data.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    toast.error('Access denied. You are not an admin.');
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);

                }
            } catch (error) {
                toast.error('Error verifying user role.');
                navigate('/');
            }
        };

        checkAdminRole();
    }, [navigate]);

    if (!isAdmin) {
        return (
            <>
                <ToastContainer />
            </>
        );
    }

    return (
        <>
            <ToastContainer />
            {children}
        </>
    );
};

export default ProtectedAdminRoutes;
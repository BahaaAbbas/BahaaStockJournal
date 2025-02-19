import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import ProtectedRoute from "./ProtectedRoutes";
import AdminUserTable from "../admin/AdminDisplayUsers";
import Admin from "../admin/Admin";
import WelcomeAdmin from "../admin/WelcomeAdmin";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";

const routes = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                )
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    }
];

const adminRoutes = [
    {
        path: '/admin',
        element: (
            <ProtectedAdminRoutes>
                <Admin />
            </ProtectedAdminRoutes>
        ),
        children: [
            {
                index: true,
                element: (
                    <ProtectedAdminRoutes>
                        <WelcomeAdmin />
                    </ProtectedAdminRoutes>
                )
            },
            {
                path: 'welcome',
                element: (
                    <ProtectedAdminRoutes>
                        <WelcomeAdmin />
                    </ProtectedAdminRoutes>
                ),

            },
            {
                path: 'users',
                element: (
                    <ProtectedAdminRoutes>
                        <AdminUserTable />
                    </ProtectedAdminRoutes>
                )
            },
        ]
    }
];

const router = createBrowserRouter([...routes, ...adminRoutes]);


export default router;
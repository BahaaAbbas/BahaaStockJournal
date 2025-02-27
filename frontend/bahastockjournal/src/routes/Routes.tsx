import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Layout from "../pages/layout/Layout";
import ProtectedRoute from "./ProtectedRoutes";
import AdminUserTable from "../admin/AdminDisplayUsers";
import Admin from "../admin/Admin";
import WelcomeAdmin from "../admin/WelcomeAdmin";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";
import Search from "../pages/search/Search";
import Reports from "../pages/reports/Reports";
import Trades from "../pages/trades/Trades";
import Journal from "../pages/journal/Journal";
import Imports from "../pages/import/Imports";

const routes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [

            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'search',
                element: (
                    <ProtectedRoute>
                        <Search />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'reports',
                element: (
                    <ProtectedRoute>
                        <Reports />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'trades',
                element: (
                    <ProtectedRoute>
                        <Trades />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'journal',
                element: (
                    <ProtectedRoute>
                        <Journal />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'import',
                element: (
                    <ProtectedRoute>
                        <Imports />
                    </ProtectedRoute>
                ),
            },
        ]
    },

    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },

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
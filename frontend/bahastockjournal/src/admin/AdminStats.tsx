import PeoplesIcon from '@rsuite/icons/Peoples';
import FunnelStepsIcon from '@rsuite/icons/FunnelSteps';
import { useEffect, useState } from 'react';
import { User } from '../Types/Admin';
import axios from 'axios';
import { UserAPI } from '../common/ServerBackEnd';

const AdminStats = () => {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios({
                    method: UserAPI.Return_Users.method,
                    url: UserAPI.Return_Users.url,
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };


        fetchUsers();

    }, []);

    return (
        <div className="p-6 h-screen text-LD">

            <h2 className="text-2xl font-bold mb-6">Admin Stats Overview</h2>

            {/* Users & Trades */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 bgS-LD">

                <div className=" rounded-lg shadow p-4 flex items-center space-x-4 border">
                    <div className="text-blue-500 text-3xl">
                        <PeoplesIcon />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">21,000</p>
                        <p className="text-gray-500">Active Users</p>
                    </div>
                </div>


                <div className=" rounded-lg shadow p-4 flex items-center space-x-4 border">
                    <div className="text-blue-500 text-3xl">
                        <FunnelStepsIcon />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">65,556</p>
                        <p className="text-gray-500">Trades</p>
                    </div>
                </div>

            </div>

            {/* Top Performance */}

            <div className='mt-12'>
                <h2 className="text-2xl font-bold mb-2">Top Performance Users</h2>

                <table className="min-w-full table-auto text-left border-collapse border border-gray-300">
                    <thead className="bg-gray-100 dark:bg-gray-600">
                        <tr>
                            <th className="p-3 border border-gray-300">Email</th>
                            <th className="p-3 border border-gray-300"># Of Trades</th>
                            <th className="p-3 border border-gray-300">Profits</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-500">

                                <td className="p-3 border border-gray-300">{user.email}</td>
                                <td className="p-3 border border-gray-300"> {Math.floor(Math.random() * (10000 - 100 + 1)) + 100}</td>
                                <td className="p-3 border border-gray-300">{Math.floor(Math.random() * (150000 - 20000 + 1)) + 20000}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default AdminStats;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserAPI } from '../common/ServerBackEnd';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '../Types/Admin';



export default function AdminUserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

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

        const fetchCurrentUser = () => {

            try {

                const token = localStorage.getItem('token');

                if (token) {

                    const payload = JSON.parse(atob(token.split('.')[1]));

                    setCurrentUserEmail(payload.email);


                }

            } catch (error) {

                console.error('Failed to fetch current user:', error);

            }

        };

        fetchUsers();
        fetchCurrentUser();
    }, []);

    const handleSelectUser = (user: User) => {
        setSelectedUser(selectedUser?._id === user._id ? null : user);
    };

    const handleDelete = async (email: string) => {
        Swal.fire({
            title: 'Are you sure you want to delete this user?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (result.isConfirmed && selectedUser) {
                try {
                    await axios({
                        method: UserAPI.Delete_User.method,
                        url: `${UserAPI.Delete_User.url}`,
                        data: {
                            email: email
                        }
                    });
                    toast.success('User deleted successfully!');
                    setUsers(users.filter(user => user._id !== selectedUser._id));
                    setSelectedUser(null);
                } catch (error) {
                    toast.error('Failed to delete user.');
                }
            }
        });
    };

    const handleUpdateRole = async (email: string, role: string) => {
        Swal.fire({
            title: 'Are you sure you want to Update Role for this user?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async (result) => {

            if (result.isConfirmed && selectedUser) {
                try {
                    await axios({
                        method: UserAPI.Update_Role.method,
                        url: `${UserAPI.Update_Role.url}`,
                        data: {
                            role: role,
                            email: email
                        }
                    });
                    toast.success('User role updated successfully!');
                    setUsers(users.map(user => user._id === selectedUser._id ? selectedUser : user));
                    setSelectedUser(null);
                } catch (error) {
                    toast.error('Failed to update user role.');
                }
            }
        });
    };



    return (
        <div className="p-6  h-screen"  >
            <table className="min-w-full table-auto text-left border-collapse border border-gray-300">
                <thead className="bg-gray-100 dark:bg-gray-600">
                    <tr>
                        <th className="p-3 border border-gray-300"></th>
                        <th className="p-3 border border-gray-300">Email</th>
                        <th className="p-3 border border-gray-300">Role</th>
                        <th className="p-3 border border-gray-300">Joined Date</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-500">


                            <td className="p-3 border border-gray-300">

                                <input type="checkbox"
                                    checked={selectedUser?._id === user._id}
                                    onChange={() => handleSelectUser(user)}
                                    disabled={user.email === currentUserEmail}

                                />

                            </td>
                            <td className="p-3 border border-gray-300">{user.email}</td>
                            <td className="p-3 border border-gray-300">{user.role}</td>
                            <td className="p-3 border border-gray-300">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center  backdrop-brightness-50 backdrop-blur-sm z-50">
                    <div className="text-LD bgS-LD p-8 rounded-lg shadow-2xl w-[500px]">
                        <h2 className="text-lg  font-bold mb-4">User Info</h2>
                        <p>Email: {selectedUser.email}</p>
                        <p>Role: {selectedUser.role}</p>
                        <select
                            className="mt-4 p-2 border  border-gray-300 rounded w-full"
                            value={selectedUser.role}
                            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                        >
                            <option className='text-LD bgS-LD' value="admin">Admin</option>
                            <option className='text-LD bgS-LD' value="normal">User</option>
                        </select>
                        <div className="flex justify-between gap-2 mt-4">
                            <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => handleDelete(selectedUser.email)}>Delete</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => handleUpdateRole(selectedUser.email, selectedUser.role)}>Update Role</button>
                            <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={() => setSelectedUser(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

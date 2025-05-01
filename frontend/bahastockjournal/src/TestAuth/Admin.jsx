import React, { useEffect, useState } from 'react';
import API from './API';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await API.get('/auth/admin');
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Access denied');
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;

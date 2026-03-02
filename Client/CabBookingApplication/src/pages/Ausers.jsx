import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import Anav from '../components/Anav';

const Ausers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/admin/users');
            setUsers(data);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await API.delete(`/admin/users/${id}`);
                fetchUsers(); // Refresh list after deletion
            } catch (err) {
                alert("Action failed");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Anav />
            <div className="container mx-auto p-8">
                <h2 className="text-3xl font-bold mb-6 text-slate-800">Registered Riders</h2>
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-100 text-slate-600 uppercase text-sm font-bold">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">User ID</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium">{user.name}</td>
                                    <td className="p-4 text-gray-600">{user.email}</td>
                                    <td className="p-4 text-xs font-mono text-gray-400">{user._id}</td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-500 hover:text-red-700 font-bold"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Ausers;
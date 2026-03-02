import React from 'react';
import Anav from '../components/Anav';
import { Link } from 'react-router-dom';

const Ahome = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Anav />
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Control Center</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {/* Updated Links */}
                    <Link to="/acabs" className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-blue-500 hover:shadow-lg transition">
                        <span className="text-4xl">🚖</span>
                        <h2 className="text-xl font-bold mt-4">Manage Fleet</h2>
                        <p className="text-gray-500 text-sm">Edit car details or update pricing.</p>
                    </Link>

                    <Link to="/users" className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-purple-500 hover:shadow-lg transition">
                        <span className="text-4xl">👥</span>
                        <h2 className="text-xl font-bold mt-4">Registered Users</h2>
                        <p className="text-gray-500 text-sm">Monitor and manage rider accounts.</p>
                    </Link>

                    <Link to="/drivers" className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-green-500 hover:shadow-lg transition">
                        <span className="text-4xl">🚘</span>
                        <h2 className="text-xl font-bold mt-4">Drivers</h2>
                        <p className="text-gray-500 text-sm">Add and manage drivers for vehicles.</p>
                    </Link>

                    <Link to="/admin-bookings" className="bg-white p-8 rounded-xl shadow-sm border-b-4 border-orange-500 hover:shadow-lg transition">
                        <span className="text-4xl">📅</span>
                        <h2 className="text-xl font-bold mt-4">All Bookings</h2>
                        <p className="text-gray-500 text-sm">View every ride scheduled in the system.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Ahome;
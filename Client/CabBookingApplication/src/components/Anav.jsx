import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Anav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear admin-specific session data
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        navigate('/admin-login');
    };

    return (
        <nav className="bg-slate-900 text-white py-4 px-8 flex justify-between items-center shadow-2xl border-b-2 border-red-600">
            <div className="flex items-center space-x-2">
                <div className="bg-red-600 text-white p-1 rounded font-bold text-xs">ADMIN</div>
                <Link to="/ahome" className="text-xl font-black tracking-tighter uppercase">
                    Cab<span className="text-red-500">Control</span>
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8 font-medium">
                <Link to="/ahome" className="hover:text-red-500 transition">Dashboard</Link>
                <Link to="/acabs" className="hover:text-red-500 transition">Fleet</Link>
                <Link to="/users" className="hover:text-red-500 transition">Users</Link>
                <Link to="/drivers" className="hover:text-red-500 transition">Drivers</Link>
                <Link to="/admin-bookings" className="hover:text-red-500 transition">Bookings</Link>
                <Link to="/addcar" className="hover:text-red-500 transition">Add Vehicle</Link>
                <button 
                    onClick={handleLogout}
                    className="bg-transparent border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Anav;
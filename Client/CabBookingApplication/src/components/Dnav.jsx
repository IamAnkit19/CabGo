import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dnav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('driver');
        navigate('/driver-login');
    };

    return (
        <nav className="bg-slate-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
            <Link to="/dhome" className="text-xl font-black tracking-tight">
                CAB<span className="text-amber-400">GO</span>
                <span className="ml-2 text-xs bg-amber-500 text-black px-2 py-0.5 rounded">DRIVER</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
                <Link to="/dhome" className="hover:text-amber-400 transition">Dashboard</Link>
                <Link to="/map" className="hover:text-amber-400 transition">Live Map</Link>
                <button
                    onClick={handleLogout}
                    className="border border-amber-400 text-amber-400 px-3 py-1 rounded hover:bg-amber-400 hover:text-black transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Dnav;


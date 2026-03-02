import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Unav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
            <Link to="/uhome" className="text-2xl font-extrabold tracking-tight text-black">
                CAB<span className="text-amber-500">GO</span>
            </Link>
            <div className="flex items-center space-x-8 font-semibold text-gray-700">
                <Link to="/cabs" className="hover:text-amber-500 transition">Cabs</Link>
                <Link to="/mybookings" className="hover:text-amber-500 transition">Bookings</Link>
                <Link to="/map" className="hover:text-amber-500 transition">Live Map</Link>
                <button 
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition font-bold"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Unav;
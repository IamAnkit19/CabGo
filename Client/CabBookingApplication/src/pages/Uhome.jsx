import React from 'react';
import Unav from '../components/Unav';
import { Link } from 'react-router-dom';

const Uhome = () => {
    // Parsing user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    return (
        <div className="min-h-screen bg-gray-100">
            <Unav />
            <main className="container mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-10 border-t-4 border-yellow-400">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Hello, {user?.name || 'Rider'}! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">Where are we heading today?</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
                        <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4">🚕</div>
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Book a Cab</h2>
                        <p className="text-gray-500 text-sm mb-4">Choose a cab and pick real locations on the map.</p>
                        <Link to="/cabs" className="inline-block bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                            View Fleet
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
                        <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4">📅</div>
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Ride History</h2>
                        <p className="text-gray-500 text-sm mb-4">View your bookings and trip details.</p>
                        <Link to="/mybookings" className="inline-block bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
                            View History
                        </Link>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
                        <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4">📍</div>
                        <h2 className="text-lg font-bold mb-2 text-gray-800">Live Map</h2>
                        <p className="text-gray-500 text-sm mb-4">See your current location on the map.</p>
                        <Link to="/map" className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
                            Open Map
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Uhome;
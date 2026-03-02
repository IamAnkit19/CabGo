import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Landing Nav */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className="text-2xl font-black tracking-tight text-black">
                    CAB<span className="text-amber-500">GO</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link to="/login" className="font-semibold text-gray-700 hover:text-amber-600 transition">User</Link>
                    <Link to="/driver-login" className="font-semibold text-gray-700 hover:text-amber-600 transition">Driver</Link>
                    <Link to="/admin-login" className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition">
                        Admin
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h2 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
                        Your Ride, <br />
                        <span className="text-amber-500">Your Way.</span>
                    </h2>
                    <p className="mt-6 text-lg text-gray-600 max-w-md">
                        Book cabs with real map-based location selection, live tracking, and accurate distance-based fare.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4">
                        <Link to="/register" className="bg-amber-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-600 shadow-lg transition">
                            Register Now
                        </Link>
                        <Link to="/login" className="border-2 border-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:text-white transition">
                            Book a Ride
                        </Link>
                    </div>
                </div>
                
                <div className="md:w-1/2 flex justify-center">
                    {/* Placeholder for a hero image or taxi illustration */}
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-8 right-0 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <div className="relative bg-white p-4 rounded-2xl shadow-2xl border border-gray-100">
                             <div className="text-9xl">🚕</div>
                             <p className="text-center font-bold mt-4 text-gray-400 italic">Premium Fleet</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">📍</div>
                        <h4 className="text-xl font-bold mb-2 text-gray-800">Map-Based Booking</h4>
                        <p className="text-gray-500">Pick exact pickup and drop locations on the map or search any address.</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">💳</div>
                        <h4 className="text-xl font-bold mb-2 text-gray-800">Accurate Fare</h4>
                        <p className="text-gray-500">Road distance via OSRM. No hidden charges—pay what you see.</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="text-4xl mb-4">🛡️</div>
                        <h4 className="text-xl font-bold mb-2 text-gray-800">Live Tracking</h4>
                        <p className="text-gray-500">See your current location on the map. Track rides in real time.</p>
                    </div>
                </div>
            </section>
            <footer className="py-8 text-center text-gray-500 text-sm">
                © CabGo — Cab Booking Platform
            </footer>
        </div>
    );
};

export default Home;
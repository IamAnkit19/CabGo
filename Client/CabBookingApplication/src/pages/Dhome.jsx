import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import Dnav from '../components/Dnav';

const Dhome = () => {
    const driver = JSON.parse(localStorage.getItem('driver') || 'null');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBookings = async () => {
        try {
            const { data } = await API.get('/driver/bookings');
            setBookings(Array.isArray(data) ? data : []);
            setError('');
        } catch (err) {
            setError('Unable to load bookings right now.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
        const id = setInterval(fetchBookings, 8000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Dnav />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome, {driver?.name || 'Driver'}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Assigned vehicle: <span className="font-semibold">{driver?.carno || '—'}</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Active Bookings</p>
                        <p className="text-3xl font-black text-amber-500">{bookings.length}</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-100 text-sm">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                        Loading bookings...
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                        No rides assigned to you yet.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {bookings.map((b) => (
                            <div
                                key={b._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition"
                            >
                                <div className="mb-2 md:mb-0">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {b.userName} · ₹{b.fare}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {(b.pickupAddress || b.selectedPickupCity) || '—'} → {(b.dropAddress || b.selectedDropCity) || '—'}
                                    </p>
                                    {b.distanceKm && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {b.distanceKm} km · {b.pickupdate} {b.pickuptime}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right text-xs text-gray-500">
                                    <p>Booked: {b.bookeddate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dhome;


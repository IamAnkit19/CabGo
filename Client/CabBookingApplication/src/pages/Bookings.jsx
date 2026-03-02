import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import Anav from '../components/Anav';

const Bookings = () => {
    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const { data } = await API.get('/admin/bookings');
                setAllBookings(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error fetching bookings", err);
                setAllBookings([]);
            }
        };
        fetchAll();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Anav />
            <div className="container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">All System Bookings</h2>
                {allBookings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
                        <p className="text-gray-500">No bookings yet.</p>
                    </div>
                ) : (
                <div className="grid gap-4">
                    {allBookings.map(b => (
                        <div key={b._id} className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">
                            <p className="font-semibold text-gray-800">{b.userName}</p>
                            <p className="text-gray-600 text-sm mt-1">{(b.pickupAddress || b.selectedPickupCity) || '—'} → {(b.dropAddress || b.selectedDropCity) || '—'}</p>
                            {b.distanceKm && <p className="text-xs text-gray-500">{b.distanceKm} km</p>}
                            <p className="text-gray-500 text-sm mt-1">{b.carname} ({b.carno}) · ₹{b.fare}</p>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};
export default Bookings;
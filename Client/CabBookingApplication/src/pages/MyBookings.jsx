import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';
import Unav from '../components/Unav';

const Mybookings = () => {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    useEffect(() => {
        if (!user?._id) return;
        const fetchMyRides = async () => {
            try {
                const { data } = await API.get(`/bookings/my/${user._id}`);
                setBookings(data);
            } catch (err) {
                console.error("Error fetching rides", err);
            }
        };
        fetchMyRides();
    }, [user?._id]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Unav />
            <div className="container mx-auto p-8">
                <h2 className="text-3xl font-bold mb-8 text-secondary">My Journey History</h2>
                
                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 mb-4">No rides booked yet. Start your first journey!</p>
                        <Link to="/cabs" className="inline-block bg-amber-500 text-black font-semibold px-6 py-2 rounded-lg hover:bg-amber-600 transition">
                            Book a Cab
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((ride) => (
                            <div key={ride._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center border-l-4 border-amber-500 hover:shadow-md transition">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{ride.carname}</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {(ride.pickupAddress || ride.selectedPickupCity) || '—'} → {(ride.dropAddress || ride.selectedDropCity) || '—'}
                                    </p>
                                    {ride.distanceKm && <p className="text-xs text-gray-500 mt-1">{ride.distanceKm} km</p>}
                                    <p className="text-xs text-gray-400 mt-1">Booked: {ride.bookeddate} · {ride.pickupdate} {ride.pickuptime}</p>
                                </div>
                                <div className="text-right mt-4 md:mt-0">
                                    <p className="font-bold text-amber-600">₹{ride.fare}</p>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Confirmed</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mybookings;
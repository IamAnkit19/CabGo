import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import Unav from '../components/Unav';

const Cabs = () => {
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                // Calling your backend GET /api/cars
                const { data } = await API.get('/cars');
                setCars(data);
            } catch (err) {
                console.error("Error fetching cars", err);
            }
        };
        fetchCars();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Unav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Select Your Ride</h1>
                {cars.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
                        <p className="text-gray-500 mb-4">No cabs available at the moment.</p>
                        <Link to="/uhome" className="text-amber-600 font-semibold hover:underline">Back to Home</Link>
                    </div>
                ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <div key={car._id} className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-lg transition">
                            <img 
                                src={car.carImage ? `http://localhost:8000/uploads/${car.carImage}` : 'https://placehold.co/400x200?text=No+Image'} 
                                alt={car.carname} 
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-xl font-bold">{car.carname}</h2>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">
                                        {car.cartype}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4">Driver: {car.drivername}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-black">₹{car.price}<span className="text-sm font-normal text-gray-400">/km</span></span>
                                    <button 
                                        onClick={() => navigate(`/book-ride/${car._id}`)}
                                        className="bg-yellow-400 px-5 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default Cabs;
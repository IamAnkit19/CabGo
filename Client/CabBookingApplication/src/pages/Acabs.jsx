import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import Anav from '../components/Anav';

const Acabs = () => {
    const [cabs, setCabs] = useState([]);
    const navigate = useNavigate();

    const fetchCabs = async () => {
        try {
            const { data } = await API.get('/cars');
            setCabs(data || []);
        } catch (err) {
            console.error("Error fetching cars", err);
            setCabs([]);
        }
    };

    useEffect(() => { fetchCabs(); }, []);

    const deleteCab = async (id) => {
        if(window.confirm("Delete this vehicle?")) {
            await API.delete(`/cars/${id}`);
            fetchCabs();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Anav />
            <div className="p-8 container mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Fleet</h2>
                {cabs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
                        <p className="text-gray-500 mb-4">No vehicles in fleet. Add your first vehicle.</p>
                        <Link to="/addcar" className="inline-block bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition">
                            Add Vehicle
                        </Link>
                    </div>
                ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cabs.map(cab => (
                        <div key={cab._id} className="bg-white p-4 rounded shadow border">
                            <h3 className="font-bold text-lg">{cab.carname}</h3>
                            <p className="text-sm text-gray-500">No: {cab.carno}</p>
                            <div className="mt-4 flex space-x-2">
                                <button onClick={() => navigate(`/acabedit/${cab._id}`)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                                <button onClick={() => deleteCab(cab._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};
export default Acabs;
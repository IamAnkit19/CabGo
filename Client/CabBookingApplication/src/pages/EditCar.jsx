import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import Anav from '../components/Anav';

const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        drivername: '',
        carname: '',
        cartype: '',
        price: '',
        carno: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await API.get('/cars');
                const car = data?.find(c => c._id === id);
                if (car) {
                    setFormData({
                        drivername: car.drivername || '',
                        carname: car.carname || '',
                        cartype: car.cartype || '',
                        price: car.price || '',
                        carno: car.carno || '',
                    });
                } else {
                    setError('Car not found');
                }
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to load car details');
            } finally {
                setFetching(false);
            }
        };
        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files?.[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const validate = () => {
        const d = formData;
        if (!(d.drivername || '').trim()) return 'Driver name is required';
        if (!(d.carname || '').trim()) return 'Car name is required';
        if (!(d.cartype || '').trim()) return 'Car type is required';
        if (!(d.price || '').toString().trim()) return 'Price is required';
        if (Number(d.price) < 1) return 'Price must be at least ₹1/km';
        if (!(d.carno || '').trim()) return 'Vehicle number is required';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) {
            setError(err);
            return;
        }
        setError('');
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('drivername', formData.drivername.trim());
            formDataToSend.append('carname', formData.carname.trim());
            formDataToSend.append('cartype', formData.cartype.trim());
            formDataToSend.append('price', formData.price.toString().trim());
            formDataToSend.append('carno', formData.carno.trim());
            if (imageFile) {
                formDataToSend.append('carImage', imageFile);
            }
            await API.put(`/cars/edit/${id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Vehicle updated successfully!');
            navigate('/acabs');
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Failed to update vehicle');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Anav />
                <div className="p-10 text-center font-bold">Loading...</div>
            </div>
        );
    }

    if (error && !formData.carname) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Anav />
                <div className="p-8">
                    <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>
                    <button onClick={() => navigate('/acabs')} className="mt-4 text-blue-600 underline">Back to Fleet</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Anav />
            <div className="container mx-auto p-8 max-w-xl">
                <h2 className="text-2xl font-bold mb-6">Edit Vehicle</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Driver Name</label>
                        <input
                            type="text"
                            name="drivername"
                            value={formData.drivername}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Car Name</label>
                        <input
                            type="text"
                            name="carname"
                            value={formData.carname}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Car Type</label>
                        <input
                            type="text"
                            name="cartype"
                            value={formData.cartype}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Price per km (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Vehicle Number</label>
                        <input
                            type="text"
                            name="carno"
                            value={formData.carno}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">New Car Image (optional, leave blank to keep current)</label>
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleImageChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Update Vehicle'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCar;

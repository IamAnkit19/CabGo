import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import Anav from '../components/Anav';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', password: '', carno: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchDrivers = async () => {
        try {
            const { data } = await API.get('/admin/drivers');
            setDrivers(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Unable to load drivers');
        }
    };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.name || !form.email || !form.password || !form.carno) {
            setError('All fields are required');
            return;
        }
        setLoading(true);
        try {
            await API.post('/admin/drivers', form);
            setForm({ name: '', email: '', password: '', carno: '' });
            fetchDrivers();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create driver');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this driver?')) return;
        try {
            await API.delete(`/admin/drivers/${id}`);
            fetchDrivers();
        } catch {
            setError('Action failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Anav />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Drivers</h1>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <form
                        onSubmit={handleCreate}
                        className="bg-white rounded-xl shadow-sm border p-5 space-y-3 md:col-span-1"
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Add Driver</h2>
                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded px-3 py-2">
                                {error}
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500"
                        />
                        <input
                            type="text"
                            placeholder="Vehicle Number (carno)"
                            value={form.carno}
                            onChange={(e) => setForm({ ...form, carno: e.target.value })}
                            className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-500"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-60"
                        >
                            {loading ? 'Creating...' : 'Create Driver'}
                        </button>
                    </form>

                    <div className="md:col-span-2 bg-white rounded-xl shadow-sm border p-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Registered Drivers</h2>
                        {drivers.length === 0 ? (
                            <p className="text-sm text-gray-500">No drivers added yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-600">
                                        <tr>
                                            <th className="px-3 py-2">Name</th>
                                            <th className="px-3 py-2">Email</th>
                                            <th className="px-3 py-2">Vehicle</th>
                                            <th className="px-3 py-2 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {drivers.map((d) => (
                                            <tr key={d._id} className="border-t hover:bg-gray-50">
                                                <td className="px-3 py-2">{d.name}</td>
                                                <td className="px-3 py-2 text-gray-600">{d.email}</td>
                                                <td className="px-3 py-2 font-mono text-xs text-gray-700">{d.carno}</td>
                                                <td className="px-3 py-2 text-center">
                                                    <button
                                                        onClick={() => handleDelete(d._id)}
                                                        className="text-xs text-red-600 font-semibold hover:underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drivers;


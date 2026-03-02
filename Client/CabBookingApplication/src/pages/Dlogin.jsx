import React, { useState } from 'react';
import API from '../api/axiosConfig';
import { Link, useNavigate, Navigate } from 'react-router-dom';

const Dlogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (localStorage.getItem('driver') && localStorage.getItem('token')) {
        return <Navigate to="/dhome" replace />;
    }

    const validate = () => {
        const e = {};
        const email = (formData.email || '').trim();
        const password = (formData.password || '').trim();
        if (!email) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
        if (!password) e.password = 'Password is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const payload = { email: formData.email.trim(), password: formData.password.trim() };
        setLoading(true);
        setErrors({});
        try {
            const { data } = await API.post('/driver/login', payload);
            localStorage.setItem('token', data.token);
            localStorage.setItem('driver', JSON.stringify(data.driver));
            navigate('/dhome');
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Driver access denied' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-amber-500 overflow-hidden">
                    <div className="bg-slate-900 py-4">
                        <Link to="/" className="text-xl font-black tracking-tight text-white block text-center">
                            CAB<span className="text-amber-400">GO</span>
                            <span className="ml-2 bg-amber-500 text-black text-xs px-2 py-0.5 rounded">DRIVER</span>
                        </Link>
                    </div>
                    <form onSubmit={handleLogin} className="p-8">
                        <h2 className="text-2xl font-black text-gray-800 mb-6 uppercase tracking-wide">Driver Login</h2>
                        {errors.submit && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                                {errors.submit}
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="driver@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg transition disabled:opacity-70"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                        <p className="mt-6 text-center text-gray-600 text-sm">
                            <Link to="/" className="font-semibold text-gray-700 hover:text-gray-900">
                                ← Back to Home
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dlogin;


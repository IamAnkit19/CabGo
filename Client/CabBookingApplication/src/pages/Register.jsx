import React, { useState } from 'react';
import API from '../api/axiosConfig';
import { Link, useNavigate, Navigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (localStorage.getItem('token') && localStorage.getItem('isAdmin') !== 'true') {
        return <Navigate to="/uhome" replace />;
    }

    const validate = () => {
        const e = {};
        const name = (formData.name || '').trim();
        const email = (formData.email || '').trim();
        const password = (formData.password || '').trim();
        if (!name) e.name = 'Name is required';
        if (!email) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
        if (!password) e.password = 'Password is required';
        else if (password.length < 6) e.password = 'Password must be at least 6 characters';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const payload = { name: formData.name.trim(), email: formData.email.trim(), password: formData.password };
        setLoading(true);
        setErrors({});
        try {
            await API.post('/users/register', payload);
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setErrors({ submit: err.response?.data?.error || 'Registration failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100 px-4 py-10">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
                    <div className="bg-black py-4">
                        <Link to="/" className="text-2xl font-black tracking-tight text-white block text-center">
                            CAB<span className="text-amber-400">GO</span>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
                        {errors.submit && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                                {errors.submit}
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-400 outline-none ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
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
                                placeholder="Min 6 characters"
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
                            {loading ? 'Creating...' : 'Register'}
                        </button>
                        <p className="mt-6 text-center text-gray-600 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-amber-600 hover:text-amber-700">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
                <Link to="/" className="block mt-4 text-center text-gray-500 hover:text-gray-700 text-sm">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Register;

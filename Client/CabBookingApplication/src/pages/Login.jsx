import React, { useState } from 'react';
import API from '../api/axiosConfig';
import { Link, useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Redirect if already logged in as user
    if (localStorage.getItem('token') && localStorage.getItem('isAdmin') !== 'true') {
        return <Navigate to="/uhome" replace />;
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
            const { data } = await API.post('/users/login', payload);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/uhome');
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Invalid credentials' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-100 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
                    <div className="bg-black py-4">
                        <Link to="/" className="text-2xl font-black tracking-tight text-white block text-center">
                            CAB<span className="text-amber-400">GO</span>
                        </Link>
                    </div>
                    <form onSubmit={handleLogin} className="p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Login</h2>
                        {errors.submit && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                                {errors.submit}
                            </div>
                        )}
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
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-amber-600 hover:text-amber-700">
                                Register
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

export default Login;

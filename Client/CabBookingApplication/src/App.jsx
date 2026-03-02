import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Uhome from './pages/Uhome';
import Cabs from './pages/Cabs';
import Mybookings from './pages/MyBookings';
import BookCab from './pages/BookCab';
import MapView from './pages/MapView';
import Alogin from './pages/Alogin';
import Ahome from './pages/Ahome';
import Ausers from './pages/Ausers';
import Acabs from './pages/Acabs';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import Bookings from './pages/Bookings';
import Drivers from './pages/Drivers';
import Dlogin from './pages/Dlogin';
import Dhome from './pages/Dhome';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');
  if (!token) return <Navigate to="/login" replace />;
  if (isAdmin === 'true') return <Navigate to="/ahome" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');
  if (!token || isAdmin !== 'true') return <Navigate to="/admin-login" replace />;
  return children;
};

const DriverRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const driver = localStorage.getItem('driver');
  if (!token || !driver) return <Navigate to="/driver-login" replace />;
  return children;
};

function App() {
  return (
    <div className="App font-sans antialiased text-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<Alogin />} />
        <Route path="/driver-login" element={<Dlogin />} />

        {/* User Routes */}
        <Route path="/uhome" element={<ProtectedRoute><Uhome /></ProtectedRoute>} />
        <Route path="/cabs" element={<ProtectedRoute><Cabs /></ProtectedRoute>} />
        <Route path="/book-ride/:id" element={<ProtectedRoute><BookCab /></ProtectedRoute>} />
        <Route path="/mybookings" element={<ProtectedRoute><Mybookings /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/ahome" element={<AdminRoute><Ahome /></AdminRoute>} />
        <Route path="/acabs" element={<AdminRoute><Acabs /></AdminRoute>} />
        <Route path="/users" element={<AdminRoute><Ausers /></AdminRoute>} />
        <Route path="/drivers" element={<AdminRoute><Drivers /></AdminRoute>} />
        <Route path="/addcar" element={<AdminRoute><AddCar /></AdminRoute>} />
        <Route path="/acabedit/:id" element={<AdminRoute><EditCar /></AdminRoute>} />
        <Route path="/admin-bookings" element={<AdminRoute><Bookings /></AdminRoute>} />

        {/* Driver Routes */}
        <Route path="/dhome" element={<DriverRoute><Dhome /></DriverRoute>} />
        
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </div>
  );
}

export default App;
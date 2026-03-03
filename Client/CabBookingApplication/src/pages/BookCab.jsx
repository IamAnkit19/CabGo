import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import Unav from '../components/Unav';
import LocationPicker from '../components/LocationPicker';

const BASE_FARE = 50;

const BookCab = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [carNotFound, setCarNotFound] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const [pickup, setPickup] = useState(null);
    const [drop, setDrop] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    const [formData, setFormData] = useState({
        pickupdate: '',
        pickuptime: '',
        note: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const ratePerKm = car ? Number(car.price) || 0 : 0;
    const distanceKm = routeInfo ? parseFloat(routeInfo.distanceKm) : 0;
    const totalFare = Math.round(BASE_FARE + ratePerKm * distanceKm);
    const estMin = routeInfo?.durationMin || 0;

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await API.get('/cars');
                const selected = data?.find((c) => c._id === id);
                setCar(selected || null);
                setCarNotFound(!selected);
            } catch (err) {
                console.error('Error fetching car', err);
                setCarNotFound(true);
            }
        };
        fetchCar();
    }, [id]);

    const validateBooking = () => {
        if (!pickup?.lat || !pickup?.display) return 'Please select pickup location';
        if (!drop?.lat || !drop?.display) return 'Please select drop location';
        if (!(formData.pickupdate || '').trim()) return 'Pickup date is required';
        if (!(formData.pickuptime || '').trim()) return 'Pickup time is required';
        if (!routeInfo?.distanceKm) return 'Calculating route... Please wait.';
        return null;
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user?._id || !car) return;
        const err = validateBooking();
        if (err) {
            alert(err);
            return;
        }
        setSubmitting(true);
        try {
            const payload = {
                selectedPickupState: '',
                selectedPickupCity: pickup.display.split(',')[pickup.display.split(',').length - 2]?.trim() || pickup.display,
                selectedDropState: '',
                selectedDropCity: drop.display.split(',')[drop.display.split(',').length - 2]?.trim() || drop.display,
                pickupAddress: pickup.display,
                dropAddress: drop.display,
                pickupLat: pickup.lat,
                pickupLng: pickup.lng,
                dropLat: drop.lat,
                dropLng: drop.lng,
                distanceKm: distanceKm,
                pickupdate: formData.pickupdate,
                pickuptime: formData.pickuptime,
                dropdate: formData.pickupdate,
                droptime: formData.pickuptime,
                carId: car._id,
                userId: user._id,
                fare: totalFare.toString(),
                userName: user.name,
                carname: car.carname,
                cartype: car.cartype || '',
                carno: car.carno || '',
                drivername: car.drivername,
                price: car.price,
                note: formData.note?.trim() || '',
                status: 'Pending',
            };
            await API.post('/bookings/book', payload);
            alert('Ride Booked Successfully!');
            navigate('/mybookings');
        } catch (err) {
            alert(err.response?.data?.error || 'Booking failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (carNotFound)
        return (
            <div className="min-h-screen bg-gray-50">
                <Unav />
                <div className="flex items-center justify-center p-10">
                    <div className="text-center">
                        <p className="font-bold text-red-600">Car not found.</p>
                        <button onClick={() => navigate('/cabs')} className="mt-4 text-amber-600 font-semibold underline">
                            Back to Cabs
                        </button>
                    </div>
                </div>
            </div>
        );
    if (!car)
        return (
            <div className="min-h-screen bg-gray-50">
                <Unav />
                <div className="flex items-center justify-center p-20">
                    <div className="animate-pulse text-gray-500">Loading car...</div>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50">
            <Unav />
            <div className="container mx-auto p-4 md:p-6 max-w-5xl">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Confirm Your Ride</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6 order-2 md:order-1">
                        <img
                            src={car.carImageUrl ? car.carImageUrl : car.carImage ? `http://localhost:8000/uploads/${car.carImage}` : 'https://placehold.co/400x200?text=No+Image'}
                            className="rounded-lg mb-4 w-full h-40 object-cover"
                            alt={car.carname}
                        />
                        <h2 className="text-xl font-bold text-gray-800">{car.carname}</h2>
                        <p className="text-amber-600 font-bold">₹{car.price}/km</p>
                        <p className="text-gray-600 text-sm mt-2">Driver: {car.drivername} · {car.carno}</p>
                        {routeInfo && (
                            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                                <p className="text-sm text-gray-700"><strong>Distance:</strong> {routeInfo.distanceKm} km</p>
                                <p className="text-sm text-gray-700"><strong>Est. time:</strong> ~{estMin} min</p>
                                <p className="text-lg font-bold text-amber-700 mt-2">Fare: ₹{totalFare}</p>
                            </div>
                        )}
                    </div>

                    <div className="order-1 md:order-2">
                        <form onSubmit={handleBooking} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                            <div className="relative">
                                <LocationPicker
                                    pickup={pickup}
                                    drop={drop}
                                    onPickup={setPickup}
                                    onDrop={setDrop}
                                    onDistanceReady={setRouteInfo}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={formData.pickupdate}
                                        onChange={(e) => setFormData({ ...formData, pickupdate: e.target.value })}
                                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-amber-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
                                    <input
                                        type="time"
                                        value={formData.pickuptime}
                                        onChange={(e) => setFormData({ ...formData, pickuptime: e.target.value })}
                                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-amber-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Note to driver (optional)</label>
                                <textarea
                                    rows={2}
                                    value={formData.note}
                                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                    placeholder="Any special instructions, landmarks, etc..."
                                    className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-amber-400"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting || !routeInfo}
                                className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Booking...' : `Confirm Booking · ₹${totalFare}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCab;

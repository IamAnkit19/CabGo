import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import Unav from '../components/Unav';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons in react-leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const userIcon = L.divIcon({
  className: 'user-location-marker',
  html: '<div style="width:20px;height:20px;background:#22c55e;border:3px solid white;border-radius:50%;box-shadow:0 2px 5px rgba(0,0,0,0.3)"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 16);
  }, [map, center]);
  return null;
}

const MapView = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setError('');
        setLoading(false);
      },
      (err) => {
        setError(err.message || 'Unable to get your location');
        setLoading(false);
        setPosition((p) => p || { lat: 20.5937, lng: 78.9629 });
      },
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  const defaultCenter = position || { lat: 20.5937, lng: 78.9629 };

  return (
    <div className="min-h-screen bg-gray-50">
      <Unav />
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-4">
          <div className="p-4 border-b bg-amber-50">
            <h1 className="text-xl font-bold text-gray-800">Live Location</h1>
            <p className="text-sm text-gray-600 mt-1">
              Your current position on the map. Allow location access for accurate tracking.
            </p>
          </div>
          {error && (
            <div className="mx-4 mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          {loading && (
            <div className="p-8 text-center text-gray-500">Fetching your location...</div>
          )}
          <div className="h-[400px] w-full">
            <MapContainer
              center={[defaultCenter.lat, defaultCenter.lng]}
              zoom={14}
              scrollWheelZoom
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={position ? [position.lat, position.lng] : null} />
              {position && (
                <Marker position={[position.lat, position.lng]} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
          {position && (
            <div className="p-4 text-sm text-gray-600">
              <strong>Coordinates:</strong> {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;

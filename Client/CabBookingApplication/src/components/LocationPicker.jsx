import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { searchLocation, reverseGeocode, getRouteDistance } from '../utils/geo';

const useMyLocation = (onSelect) => {
  const [loading, setLoading] = useState(false);
  const run = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        try {
          const addr = await reverseGeocode(lat, lng);
          onSelect({ lat, lng, display: addr });
        } catch {
          onSelect({ lat, lng, display: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
        }
        setLoading(false);
      },
      () => {
        alert('Could not get your location');
        setLoading(false);
      }
    );
  };
  return { run, loading };
};

const pickIcon = L.divIcon({
  className: 'pickup-marker',
  html: '<div style="width:24px;height:24px;background:#22c55e;border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const dropIcon = L.divIcon({
  className: 'drop-marker',
  html: '<div style="width:24px;height:24px;background:#ef4444;border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const LocationPicker = ({ pickup, drop, onPickup, onDrop, onDistanceReady }) => {
  const { run: useLocation, loading: locLoading } = useMyLocation(onPickup);
  const [pickupQuery, setPickupQuery] = useState('');
  const [dropQuery, setDropQuery] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [loadingDist, setLoadingDist] = useState(false);
  const searchTimeout = useRef(null);

  const doSearch = async (query, setSuggestions) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const results = await searchLocation(query);
      setSuggestions(results);
    } catch {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => doSearch(pickupQuery, setPickupSuggestions), 300);
    return () => clearTimeout(searchTimeout.current);
  }, [pickupQuery]);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => doSearch(dropQuery, setDropSuggestions), 300);
    return () => clearTimeout(searchTimeout.current);
  }, [dropQuery]);

  const handlePickupSelect = async (lat, lng, display) => {
    onPickup({ lat, lng, display: display || '' });
    setPickupSuggestions([]);
    if (!display) {
      try {
        const addr = await reverseGeocode(lat, lng);
        onPickup({ lat, lng, display: addr });
      } catch {}
    }
  };

  const handleDropSelect = async (lat, lng, display) => {
    onDrop({ lat, lng, display: display || '' });
    setDropSuggestions([]);
    if (!display) {
      try {
        const addr = await reverseGeocode(lat, lng);
        onDrop({ lat, lng, display: addr });
      } catch {}
    }
  };

  useEffect(() => {
    if (!pickup?.lat || !drop?.lat || !onDistanceReady) return;
    setLoadingDist(true);
    getRouteDistance(pickup.lat, pickup.lng, drop.lat, drop.lng)
      .then((res) => {
        if (res) onDistanceReady(res);
      })
      .catch(() => onDistanceReady(null))
      .finally(() => setLoadingDist(false));
  }, [pickup?.lat, pickup?.lng, drop?.lat, drop?.lng]);

  const center = pickup?.lat
    ? [pickup.lat, pickup.lng]
    : drop?.lat
    ? [drop.lat, drop.lng]
    : [20.5937, 78.9629];

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Pickup Location</label>
        <input
          type="text"
          value={pickupQuery}
          onChange={(e) => setPickupQuery(e.target.value)}
          placeholder="Search address or city..."
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-amber-400"
        />
        {pickup?.display && <p className="text-xs text-green-600 mt-1 truncate">✓ {pickup.display}</p>}
        <button
          type="button"
          onClick={useLocation}
          disabled={locLoading}
          className="mt-2 text-sm text-amber-600 font-medium hover:underline disabled:opacity-50"
        >
          {locLoading ? 'Getting location...' : '📍 Use my location'}
        </button>
        {pickupSuggestions.length > 0 && (
          <ul className="mt-1 border rounded-lg overflow-hidden bg-white shadow-lg z-20 absolute left-0 right-0">
            {pickupSuggestions.map((s, i) => (
              <li
                key={i}
                className="px-3 py-2 hover:bg-amber-50 cursor-pointer text-sm"
                onClick={() => {
                  handlePickupSelect(s.lat, s.lng, s.display);
                  setPickupQuery('');
                }}
              >
                {s.display}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Drop Location</label>
        <input
          type="text"
          value={dropQuery}
          onChange={(e) => setDropQuery(e.target.value)}
          placeholder="Search address or city..."
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-amber-400"
        />
        {drop?.display && <p className="text-xs text-red-600 mt-1 truncate">✓ {drop.display}</p>}
        {dropSuggestions.length > 0 && (
          <ul className="mt-1 border rounded-lg overflow-hidden bg-white shadow-lg z-20 absolute left-0 right-0">
            {dropSuggestions.map((s, i) => (
              <li
                key={i}
                className="px-3 py-2 hover:bg-amber-50 cursor-pointer text-sm"
                onClick={() => {
                  handleDropSelect(s.lat, s.lng, s.display);
                  setDropQuery('');
                }}
              >
                {s.display}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="h-48 rounded-xl overflow-hidden border">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom
          style={{ height: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler
            onSelect={(lat, lng) => {
              if (!pickup?.lat) handlePickupSelect(lat, lng);
              else handleDropSelect(lat, lng);
            }}
          />
          {pickup?.lat && <Marker position={[pickup.lat, pickup.lng]} icon={pickIcon} />}
          {drop?.lat && <Marker position={[drop.lat, drop.lng]} icon={dropIcon} />}
        </MapContainer>
      </div>
      {loadingDist && <p className="text-sm text-gray-500">Calculating distance...</p>}
    </div>
  );
};

export default LocationPicker;

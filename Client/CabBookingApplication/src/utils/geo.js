/**
 * Geo utilities - Geocoding (Nominatim) and routing (OSRM)
 * Free, no API key required
 */

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const OSRM_BASE = 'https://router.project-osrm.org';

const fetchOpts = {
  headers: { 'Accept-Language': 'en', 'User-Agent': 'CabGoBooking/1.0' },
};

export const searchLocation = async (query) => {
  if (!query || query.trim().length < 3) return [];
  const url = `${NOMINATIM_BASE}/search?q=${encodeURIComponent(query)}&format=json&limit=5`;
  const res = await fetch(url, fetchOpts);
  const data = await res.json();
  return data.map((d) => ({
    lat: parseFloat(d.lat),
    lng: parseFloat(d.lon),
    display: d.display_name,
  }));
};

export const reverseGeocode = async (lat, lng) => {
  const url = `${NOMINATIM_BASE}/reverse?lat=${lat}&lon=${lng}&format=json`;
  const res = await fetch(url, fetchOpts);
  const data = await res.json();
  return data?.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};

export const getRouteDistance = async (fromLat, fromLng, toLat, toLng) => {
  try {
    const coords = `${fromLng},${fromLat};${toLng},${toLat}`;
    const url = `${OSRM_BASE}/route/v1/driving/${coords}?overview=false`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === 'Ok' && data.routes?.[0]) {
      const distanceM = data.routes[0].distance;
      const durationSec = data.routes[0].duration;
      return {
        distanceKm: (distanceM / 1000).toFixed(2),
        distanceM,
        durationMin: Math.round(durationSec / 60),
      };
    }
  } catch (_) {}
  const km = haversineDistance(fromLat, fromLng, toLat, toLng);
  return {
    distanceKm: km.toFixed(2),
    distanceM: km * 1000,
    durationMin: Math.round((km / 30) * 60),
  };
};

export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

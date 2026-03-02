# CabGo — Cab Booking Platform

A full-stack cab booking application with real-time map integration, location selection, and accurate fare calculation.

## Features

- **User & Admin Roles**: Separate dashboards for riders and fleet managers
- **Map Integration**: OpenStreetMap-based maps with Leaflet
- **Live Location**: View your current position in real-time
- **Location Selection**: Search addresses or click on the map to set pickup/drop
- **Accurate Fare**: Road distance via OSRM + per-km rate
- **Booking History**: Track past and upcoming rides
- **Fleet Management**: Add, edit, delete vehicles (admin)
- **User Management**: View and manage registered riders (admin)

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Leaflet, Axios
- **Backend**: Node.js, Express, MongoDB, JWT
- **Maps**: OpenStreetMap, Nominatim (geocoding), OSRM (routing)

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- `.env` in Server folder with `MONGO_URI` and `JWT_SECRET`

### Backend

```bash
cd Server
npm install
node seed.js   # Creates default admin (admin@example.com / admin123)
node index.js # Starts on http://localhost:8000
```

### Frontend

```bash
cd Client/CabBookingApplication
npm install
npm run dev   # Starts on http://localhost:5173
```

## Default Credentials

- **Admin**: `admin@example.com` / `admin123` (after running seed)
- **Users**: Register via `/register`

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/users/register | No | Register user |
| POST | /api/users/login | No | User login |
| POST | /api/admin/login | No | Admin login |
| GET | /api/cars | No | List all cars |
| POST | /api/bookings/book | JWT | Create booking |
| GET | /api/bookings/my/:userId | JWT | User's bookings |
| GET | /api/admin/bookings | Admin | All bookings |
| POST | /api/cars/add | Admin | Add car |
| PUT | /api/cars/edit/:id | Admin | Edit car |
| DELETE | /api/cars/:id | Admin | Delete car |

## Project Structure

```
CabBookingApplicaton/
├── Client/CabBookingApplication/   # React frontend
│   ├── src/
│   │   ├── api/           # Axios config
│   │   ├── components/     # Unav, Anav, LocationPicker
│   │   ├── pages/          # Route components
│   │   ├── utils/          # geo.js (Nominatim, OSRM)
│   │   └── App.jsx
│   └── package.json
├── Server/                 # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── index.js
└── README.md
```

## License

MIT

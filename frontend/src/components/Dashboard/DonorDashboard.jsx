import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

export default function DonorDashboard() {

  const auth = useSelector((state) => state.auth);
  const { id: userId } = auth; 

  useEffect(() => {

    const updateLocation = async (latitude, longitude) => {
      try {
        await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/donor/update-location`, {
          userId,
          latitude,
          longitude,
        });
      } catch (error) {
        console.error("Error updating location:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        updateLocation(lat, lon); 
      }, (error) => {
        console.error("Error occurred while tracking location:", error);
      }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      });
    }

  }, [userId]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 px-4">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Donor Dashboard</h1>
                <p className="text-gray-700 text-center">Track your donations and upcoming donation schedules.</p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg">Total Donations: 5</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Next Donation Date: 15th August</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Pending Requests: 2</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Blood Group: O+</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Last Donation: 1st June</div>
                </div>

                <h2 className="text-2xl font-bold mt-8 text-gray-800">Donation History</h2>
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <ul className="text-gray-700">
                        <li>Donated 2 units to City Hospital - June 2023</li>
                        <li>Donated 1 unit to National Blood Bank - March 2023</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

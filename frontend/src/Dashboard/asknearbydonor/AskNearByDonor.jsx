import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import getLocationName from "./getLocationName";

export default function AskNearByDonor() {
    const auth = useSelector((state) => state.auth);
    const { id: userId } = auth;

    const [donors, setDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [location, setLocation] = useState({ latitude: null, longitude: null, name: "" });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [units, setUnits] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = {
                donorId: selectedDonor._id,
                userId,
                bloodType: selectedDonor.bloodType,
                units: parseInt(units),
            };

            await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/donor/blood-request-to-nearby-donor`, requestData);
            toast.success("Blood request submitted successfully.");
            closeModal();
        } catch (error) {
            toast.error("Error submitting request.");
        }
    };

    const fetchDonors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/get-all-donors`);
            setDonors(response.data);
        } catch (error) {
            toast.error("Error fetching donors.");
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (degree) => (degree * Math.PI) / 180;
        const R = 6371;
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const getLiveLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    getLocationName(lat, lon, (locationName) => {
                        setLocation({ latitude: lat, longitude: lon, name: locationName });
                        toast.success(`Location Fetched: ${locationName}`);
                    });

                    const nearbyDonors = donors.filter((donor) => {
                        if (donor.location?.coordinates?.length === 2) {
                            const [donorLon, donorLat] = donor.location.coordinates;
                            const distance = getDistance(lat, lon, donorLat, donorLon);
                            return distance <= 18;
                        }
                        return false;
                    });

                    setFilteredDonors(nearbyDonors);
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    toast.error("Unable to fetch location.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            toast.error("Geolocation is not supported by your browser.");
        }
    };

    const openModal = (donor) => {
        setSelectedDonor(donor);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDonor(null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-6xl bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Nearby Donors</h2>
                <div className="mb-4 text-center">
                    <button onClick={getLiveLocation} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Get Live Location</button>
                    {location.name && (
                        <p className="text-white mt-3">Current Location: {location.name}</p>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-lg uppercase bg-gray-800 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Blood Type</th>
                                <th className="px-6 py-3">City</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDonors.length > 0 ? (
                                filteredDonors.map((donor) => (
                                    <tr key={donor._id} className="border-b text-lg border-gray-700">
                                        <td className="px-6 py-4">{donor.name}</td>
                                        <td className="px-6 py-4">{donor.locationName || "Fetching location..."}</td>
                                        <td className="px-6 py-4">{donor.email}</td>
                                        <td className="px-6 py-4">{donor.bloodType}</td>
                                        <td className="px-6 py-4">{donor.city}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-lg font-semibold ${donor.status === "Active" ? "bg-green-700 text-white" : "bg-red-500 text-gray-950"}`}>{donor.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => openModal(donor)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Ask for Blood</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4 text-lg">No nearby donors found within 18 km.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Request Blood from {selectedDonor?.name}</h2>
                        <p className="text-gray-600 mb-4">Blood Type: <span className="font-semibold">{selectedDonor?.bloodType}</span></p>

                        {/* Blood Request Form */}
                        <form onSubmit={handleSubmit}>
                            <label className="block text-gray-700 font-semibold mb-2">Enter Units:</label>
                            <input
                                type="number"
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
                                min="1"
                                required
                                className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

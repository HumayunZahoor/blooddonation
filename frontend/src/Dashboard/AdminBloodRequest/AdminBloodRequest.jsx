import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AdminBloodRequest() {
    const auth = useSelector((state) => state.auth);
    const { id: adminId } = auth; // Extract userId from Redux state
    const [donors, setDonors] = useState([]);
    const [units, setUnits] = useState({});

    // Fetch donors from the database
    const fetchDonors = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/get-all-donors-by-status`);
            setDonors(response.data);
        } catch (error) {
            toast.error("Error fetching donors.");
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    // Handle blood request
    const requestBlood = async (donorId) => {
        if (!units[donorId] || units[donorId] <= 0) {
            toast.error("Please enter a valid number of units.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/request-blood`, {
                donorId,
                adminId,
                units: units[donorId],
            });
            toast.success(response.data.message);
            setUnits({ ...units, [donorId]: "" }); // Reset input field
        } catch (error) {
            toast.error("Error sending blood request.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-5xl bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Request Blood from Donors</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-lg uppercase bg-gray-800 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Blood Type</th>
                                <th className="px-6 py-3">City</th>
                                <th className="px-6 py-3">Units</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.map((donor) => (
                                <tr key={donor._id} className="border-b text-lg border-gray-700">
                                    <td className="px-6 py-4">{donor.name}</td>
                                    <td className="px-6 py-4">{donor.phone}</td>
                                    <td className="px-6 py-4">{donor.bloodType}</td>
                                    <td className="px-6 py-4">{donor.city}</td>
                                    <td className="px-6 py-4">
                                        <input
                                            type="number"
                                            value={units[donor._id] || ""}
                                            onChange={(e) => setUnits({ ...units, [donor._id]: e.target.value })}
                                            className="w-16 p-2 bg-gray-800 text-white border border-gray-600 rounded"
                                            min="1"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => requestBlood(donor._id)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                        >
                                            Request Blood
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

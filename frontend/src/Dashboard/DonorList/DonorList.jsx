import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DonorList() {
    const [donors, setDonors] = useState([]);

    // Fetch donors from the database
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

    // Toggle donor activation status
    const toggleStatus = async (donorId) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/donor-status-toggle/${donorId}`);
            toast.success(response.data.message);
            fetchDonors(); // Refresh donor list
        } catch (error) {
            toast.error("Error updating donor status.");
        }
    };

    return (
        <div className="min-h-screen flex  justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-5xl bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Donor Requests</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-lg uppercase bg-gray-800 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Blood Type</th>
                                <th className="px-6 py-3">City</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.map((donor) => (
                                <tr key={donor._id} className="border-b text-lg border-gray-700">
                                    <td className="px-6 py-4">{donor.name}</td>
                                    <td className="px-6 py-4">{donor.email}</td>
                                    <td className="px-6 py-4">{donor.bloodType}</td>
                                    <td className="px-6 py-4">{donor.city}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-lg font-semibold ${donor.status === "Active" ? "bg-green-700 text-white" : "bg-red-500 text-gray-950"}`}>
                                            {donor.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(donor._id)}
                                            className={`px-4 py-2 rounded text-white font-semibold transition-all duration-300 ${donor.status === "Active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                                        >
                                            {donor.status === "Active" ? "Inactivate" : "Activate"}
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

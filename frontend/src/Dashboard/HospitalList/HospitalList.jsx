import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function HospitalList() {
    const [hospitals, setHospitals] = useState([]);

    // Fetch hospitals from the database
    const fetchHospitals = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/get-all-hospitals`);
            setHospitals(response.data);
        } catch (error) {
            toast.error("Error fetching hospitals.");
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, []);

    // Toggle hospital activation status
    const toggleStatus = async (hospitalId) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/hospital-status-toggle/${hospitalId}`);
            toast.success(response.data.message);
            fetchHospitals(); // Refresh hospital list
        } catch (error) {
            toast.error("Error updating hospital status.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-5xl bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Hospital Requests</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-lg uppercase bg-gray-800 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Phone</th>
                                <th className="px-6 py-3">City</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospitals.map((hospital) => (
                                <tr key={hospital._id} className="border-b text-lg border-gray-700">
                                    <td className="px-6 py-4">{hospital.name}</td>
                                    <td className="px-6 py-4">{hospital.email}</td>
                                    <td className="px-6 py-4">{hospital.phone}</td>
                                    <td className="px-6 py-4">{hospital.city}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-lg font-semibold ${hospital.status === "Active" ? "bg-green-700 text-white" : "bg-red-500 text-gray-950"}`}>
                                            {hospital.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStatus(hospital._id)}
                                            className={`px-4 py-2 rounded text-white font-semibold transition-all duration-300 ${hospital.status === "Active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                                        >
                                            {hospital.status === "Active" ? "Inactivate" : "Activate"}
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

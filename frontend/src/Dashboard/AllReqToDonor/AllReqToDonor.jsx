import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AllReqToDonor() {
    const [requests, setRequests] = useState([]);

    // Fetch all blood requests
    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/get-all-blood-requests`);
            setRequests(response.data);
        } catch (error) {
            toast.error("Error fetching blood requests.");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-5xl bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Blood Requests</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-lg uppercase bg-gray-800 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Donor Name</th>
                                <th className="px-6 py-3">Admin</th>
                                <th className="px-6 py-3">Blood Type</th>
                                <th className="px-6 py-3">Units</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id} className="border-b text-lg border-gray-700">
                                    <td className="px-6 py-4">{req.donorId?.name || "Unknown"}</td>
                                    <td className="px-6 py-4">{req.adminId?.name || "Unknown"}</td>
                                    <td className="px-6 py-4">{req.bloodType}</td>
                                    <td className="px-6 py-4">{req.units}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-lg font-semibold ${req.status === "Accepted" ? "bg-green-700 text-white" : req.status === "Pending" ? "bg-yellow-500 text-gray-950" : "bg-red-500 text-gray-950"}`}>
                                            {req.status}
                                        </span>
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

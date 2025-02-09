import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function ManageNearByReq() {
    const auth = useSelector((state) => state.auth);
    const { id: userId } = auth;
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/donor/all-nearby-blood-requests/${userId}`);
                setRequests(response.data.bloodRequests);
            } catch (error) {
                toast.error("Failed to fetch blood requests.");
            }
        };
        if (userId) fetchRequests();
    }, [userId]);

    const handleStatusUpdate = async (requestId, status) => {
        try {
            await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/donor/update-nearby-request`, { requestId, status });
            toast.success(`Request ${status.toLowerCase()} successfully!`);
            setRequests((prev) => prev.map((req) => (req._id === requestId ? { ...req, status } : req)));
        } catch (error) {
            toast.error("Failed to update request.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Blood Requests</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Blood Type</th>
                            <th className="border border-gray-300 px-4 py-2">Units</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No requests found.</td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req._id} className="border border-gray-300">
                                    <td className="border px-4 py-2">{req.bloodType}</td>
                                    <td className="border px-4 py-2">{req.units}</td>
                                    <td className={`border px-4 py-2 ${req.status === "Pending" ? "text-yellow-500" : req.status === "Accepted" ? "text-green-500" : "text-red-500"}`}>
                                        {req.status}
                                    </td>
                                    <td className="border px-4 py-2 flex gap-2 justify-center">
                                        {req.status === "Pending" && (
                                            <>
                                                <button onClick={() => handleStatusUpdate(req._id, "Accepted")} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">
                                                    Accept
                                                </button>
                                                <button onClick={() => handleStatusUpdate(req._id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

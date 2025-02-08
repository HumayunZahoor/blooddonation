import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function BloodRequestsAdmin() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/hospital/all-requests`);
            setRequests(data);
        } catch (error) {
            toast.error("Failed to fetch requests");
        }
    };

    const updateRequest = async (id, newStatus, newDispatched) => {
        try {
            await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/hospital/update-request/${id}`, {
                status: newStatus,
                dispatched: newDispatched,
            });

            toast.success("Request updated successfully");
            fetchRequests();
        } catch (error) {
            toast.error("Failed to update request");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-3xl">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Blood Requests
                </h2>

                {requests.length === 0 ? (
                    <p className="text-white text-center">No blood requests available.</p>
                ) : (
                    <div className="space-y-4">
                        {requests.map((request) => (
                            <div key={request._id} className="bg-gray-800 p-4 rounded shadow">
                                <p className="text-white">
                                    <strong>User:</strong> {request.userId?.name || "Unknown"} ({request.userId?.email})
                                </p>
                                <p className="text-white"><strong>Blood Type:</strong> {request.bloodType}</p>
                                <p className="text-white"><strong>Units:</strong> {request.units}</p>
                                <p className="text-white"><strong>Status:</strong> {request.status}</p>
                                <p className="text-white"><strong>Dispatched:</strong> {request.dispatched ? "Yes" : "No"}</p>

                                {/* Status Buttons */}
                                <div className="flex space-x-2 mt-3">
                                    <button
                                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                                        onClick={() => updateRequest(request._id, "Accepted", request.dispatched)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                                        onClick={() => updateRequest(request._id, "Rejected", request.dispatched)}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
                                        onClick={() => updateRequest(request._id, request.status, !request.dispatched)}
                                    >
                                        {request.dispatched ? "Undo Dispatch" : "Mark Dispatched"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function BloodRequestHistory() {
    const [requests, setRequests] = useState([]);
    const auth = useSelector((state) => state.auth);
    const { id: userId } = auth; 

    useEffect(() => {
        if (userId) {
            fetchRequests();
        }
    }, [userId]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/hospital/user-requests/${userId}`);
            setRequests(response.data.requests);
        } catch (error) {
            console.error("Error fetching blood requests", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    My Blood Requests
                </h2>

                {requests.length === 0 ? (
                    <p className="text-gray-300 text-center">No requests found.</p>
                ) : (
                    <div className="space-y-4">
                        {requests.map((request) => (
                            <div key={request._id} className="bg-gray-800 p-4 rounded-md shadow-md">
                                <p className="text-gray-300"><span className="font-semibold text-white">Blood Type:</span> {request.bloodType}</p>
                                <p className="text-gray-300"><span className="font-semibold text-white">Units Requested:</span> {request.units}</p>
                                <p className="text-gray-300"><span className="font-semibold text-white">Status:</span> 
                                    <span className={`ml-2 font-semibold 
                                        ${request.status === "Pending" ? "text-yellow-500" : 
                                        request.status === "Accepted" ? "text-green-500" : "text-red-500"}`}>
                                        {request.status}
                                    </span>
                                </p>
                                <p className="text-gray-300"><span className="font-semibold text-white">Dispatched:</span> 
                                    {request.dispatched ? <span className="text-green-500 ml-2">Yes</span> : <span className="text-red-500 ml-2">No</span>}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

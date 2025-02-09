import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const NearbyRequestHistory = () => {
    const auth = useSelector((state) => state.auth);
    const { id: userId } = auth; // Get logged-in user's ID

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/donor/nearby-request-history/${userId}`
                );
                setRequests(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch request history.");
                setLoading(false);
            }
        };

        if (userId) {
            fetchRequestHistory();
        }
    }, [userId]);

    if (loading) return <p>Loading request history...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">Your Blood Request History</h2>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Blood Type</th>
                            <th className="border p-2">Units</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Requested At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id} className="text-center text-white">
                                <td className="border p-2">{req.bloodType}</td>
                                <td className="border p-2">{req.units}</td>
                                <td
                                    className={`border p-2 font-bold ${
                                        req.status === "Accepted"
                                            ? "text-green-600"
                                            : req.status === "Rejected"
                                            ? "text-red-600"
                                            : "text-yellow-600"
                                    }`}
                                >
                                    {req.status}
                                </td>
                                <td className="border p-2">{new Date(req.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default NearbyRequestHistory;

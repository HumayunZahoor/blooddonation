import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function BloodStock() {
    const auth = useSelector((state) => state.auth);
    const { id: adminId } = auth; // Get adminId from Redux

    const [bloodStock, setBloodStock] = useState(null);

    useEffect(() => {
        const fetchBloodStock = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/blood-stock/${adminId}`);
                setBloodStock(response.data);
            } catch (error) {
                toast.error("Failed to fetch blood stock.");
            }
        };

        if (adminId) fetchBloodStock();
    }, [adminId]);

    const bloodTypes = [
        { type: "A+", key: "A_Pos", color: "bg-red-500" },
        { type: "A-", key: "A_Neg", color: "bg-red-600" },
        { type: "B+", key: "B_Pos", color: "bg-blue-500" },
        { type: "B-", key: "B_Neg", color: "bg-blue-600" },
        { type: "O+", key: "O_Pos", color: "bg-green-500" },
        { type: "O-", key: "O_Neg", color: "bg-green-600" },
        { type: "AB+", key: "AB_Pos", color: "bg-purple-500" },
        { type: "AB-", key: "AB_Neg", color: "bg-purple-600" },
    ];

    if (!bloodStock) {
        return <p className="text-center text-lg font-semibold">Loading blood stock...</p>;
    }

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Blood Stock Availability</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {bloodTypes.map(({ type, key, color }) => (
                        <div key={key} className={`p-6 rounded-lg shadow-md ${color} text-white text-center`}>
                            <h2 className="text-xl font-bold">{type}</h2>
                            <p className="text-2xl font-semibold">{bloodStock[key]} units</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

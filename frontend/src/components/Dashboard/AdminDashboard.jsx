import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
    const auth = useSelector((state) => state.auth);
    const { id: adminId } = auth; 
    const [isBloodBankInitialized, setIsBloodBankInitialized] = useState(false);

    useEffect(() => {
        const initializeBloodBank = async () => {
            if (!adminId || isBloodBankInitialized) return; // Prevent multiple calls

            try {
                const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/initialize-blood-bank`, { adminId });
                // toast.success(data.message);
                setIsBloodBankInitialized(true); // Mark as initialized
            } catch (error) {
                toast.error("Failed to initialize blood bank.");
            }
        };

        initializeBloodBank();
    }, [adminId, isBloodBankInitialized]); 

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 px-4">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Admin Dashboard</h1>
                <p className="text-gray-700 text-center">Manage all users, donors, hospitals, and blood requests.</p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg">Total Donors: 250</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Total Hospitals: 50</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Total Blood Requests: 300</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Pending Approvals: 45</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Active Users: 1200</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Reports Filed: 10</div>
                </div>

                <h2 className="text-2xl font-bold mt-8 text-gray-800">Recent Blood Requests</h2>
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <ul className="text-gray-700">
                        <li>A+ Blood Request - Approved</li>
                        <li>O- Blood Request - Pending</li>
                        <li>B+ Blood Request - Rejected</li>
                        <li>AB- Blood Request - Completed</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold mt-8 text-gray-800">Registered Hospitals</h2>
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <ul className="text-gray-700">
                        <li>City Hospital - 25 Requests</li>
                        <li>Green Valley Hospital - 15 Requests</li>
                        <li>National Blood Center - 40 Requests</li>
                        <li>Central Medical - 30 Requests</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

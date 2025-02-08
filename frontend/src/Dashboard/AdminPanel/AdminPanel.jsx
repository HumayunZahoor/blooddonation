import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminPanel() {
    const [donors, setDonors] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [receivers, setReceivers] = useState([]);
    const [bloodRequests, setBloodRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const donorsRes = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/get-all-donors`);
                const hospitalsRes = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/get-all-hospitals`);
                const receiversRes = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/get-all-receivers`);
                const bloodRequestsRes = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/get-all-blood-requests`);

                setDonors(donorsRes.data);
                setHospitals(hospitalsRes.data);
                setReceivers(receiversRes.data);
                setBloodRequests(bloodRequestsRes.data);
            } catch (error) {
                toast.error("Failed to fetch data");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <h1 className="text-3xl font-bold text-center text-white mb-6">Admin Panel</h1>

            {/* Donors Table */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Donors</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Blood Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map((donor) => (
                            <tr key={donor._id} className="text-center">
                                <td className="border p-2">{donor.name}</td>
                                <td className="border p-2">{donor.email}</td>
                                <td className="border p-2">{donor.bloodType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Hospitals Table */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospitals</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals.map((hospital) => (
                            <tr key={hospital._id} className="text-center">
                                <td className="border p-2">{hospital.name}</td>
                                <td className="border p-2">{hospital.address}</td>
                                <td className="border p-2">{hospital.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Receivers Table */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Receivers</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receivers.map((receiver) => (
                            <tr key={receiver._id} className="text-center">
                                <td className="border p-2">{receiver.name}</td>
                                <td className="border p-2">{receiver.email}</td>
                                <td className="border p-2">{receiver.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Blood Requests Table */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Blood Requests</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Donor</th>
                            <th className="border p-2">Admin</th>
                            <th className="border p-2">Blood Type</th>
                            <th className="border p-2">Units</th>
                            <th className="border p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bloodRequests.map((request) => (
                            <tr key={request._id} className="text-center">
                                <td className="border p-2">{request.donorId?.name || "N/A"}</td>
                                <td className="border p-2">{request.adminId?.name || "N/A"}</td>
                                <td className="border p-2">{request.bloodType}</td>
                                <td className="border p-2">{request.units}</td>
                                <td className={`border p-2 ${request.status === "Pending" ? "text-yellow-500" : request.status === "Accepted" ? "text-green-500" : "text-red-500"}`}>
                                    {request.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

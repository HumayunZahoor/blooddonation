import React from "react";

export default function HospitalDashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 px-4">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Hospital Dashboard</h1>
                <p className="text-gray-700 text-center">Monitor blood stock, donor availability, and patient requests.</p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg">Blood Stock: 120 Units</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Available Donors: 80</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Pending Requests: 15</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Emergency Cases: 5</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Successful Donations: 300</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Rejections: 12</div>
                </div>

                <h2 className="text-2xl font-bold mt-8 text-gray-800">Recent Blood Requests</h2>
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <ul className="text-gray-700">
                        <li>Patient A+ needs 2 units - Pending</li>
                        <li>Patient B- needs 1 unit - Completed</li>
                        <li>Patient O+ needs 3 units - Approved</li>
                    </ul>
                </div>

                <h2 className="text-2xl font-bold mt-8 text-gray-800">Available Donors</h2>
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <ul className="text-gray-700">
                        <li>John Doe - O+ - Available</li>
                        <li>Jane Smith - A- - Available</li>
                        <li>Michael Johnson - B+ - Not Available</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

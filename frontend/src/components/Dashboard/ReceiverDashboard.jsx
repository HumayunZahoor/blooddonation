import React from "react";

export default function ReceiverDashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 px-4">
            <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Receiver Dashboard</h1>
                <p className="text-gray-700 text-center">Check blood availability and your request status.</p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded-lg">Requested Blood Type: A+</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Request Status: Approved</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Hospital Assigned: City Hospital</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Emergency Level: High</div>
                    <div className="p-4 bg-gray-100 rounded-lg">Doctor Assigned: Dr. Ali Khan</div>
                </div>

                <h2 className="text-2xl font-bold mt-8 text-gray-800">Medical History</h2>
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <ul className="text-gray-700">
                        <li>Received blood transfusion on June 2023</li>
                        <li>No prior allergic reactions to blood</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

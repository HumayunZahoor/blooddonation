import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export default function BloodRequestForm() {
    const [bloodType, setBloodType] = useState("");
    const [units, setUnits] = useState("");
    const auth = useSelector((state) => state.auth);
    const { id: userId } = auth; 

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userId) {
            toast.error("You must be logged in to request blood");
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/hospital/request-for-blood`,
                { userId, bloodType, units }
            );

            toast.success("Blood request submitted successfully");
            setBloodType("");
            setUnits("");
        } catch (error) {
            toast.error("Failed to submit request");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Request Blood
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Blood Type Dropdown */}
                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-1">Blood Type</label>
                        <select
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        >
                            <option value="" disabled>Select Blood Type</option>
                            {bloodTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Units Input */}
                    <div>
                        <label className="block text-gray-300 text-sm font-semibold mb-1">Units Required</label>
                        <input
                            type="number"
                            value={units}
                            onChange={(e) => setUnits(e.target.value)}
                            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter Units Required"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition duration-300 ease-in-out"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
}

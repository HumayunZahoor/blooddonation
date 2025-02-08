import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function DonorRegistration() {
    const auth = useSelector((state) => state.auth);
    const { id: userId } = auth; // Extract userId from Redux state

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bloodType: '',
        city: '',
        lastDonationDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/donor/register`,
                { ...formData, userId } // Include userId in request payload
            );
            toast.success(response.data.message);
            setFormData({ name: '', email: '', phone: '', bloodType: '', city: '', lastDonationDate: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || "Error registering donor");
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Register as a Blood Donor</h2>
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Blood Type</label>
                        <select
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        >
                            <option value="">Select Blood Type</option>
                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Last Donation Date</label>
                        <input
                            type="date"
                            name="lastDonationDate"
                            value={formData.lastDonationDate}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-red-600 text-white py-3 rounded font-semibold hover:bg-red-700 transition-all duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function HospitalRegistration() {
    const auth = useSelector((state) => state.auth);
    const { id: userId } = auth; // Extract userId from Redux state

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        services: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_BACKEND_URL}/hospital/register`,
                { ...formData, services: formData.services.split(','), userId } // Convert services to an array
            );
            toast.success(response.data.message);
            setFormData({ name: '', email: '', phone: '', city: '', address: '', services: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || "Error registering hospital");
        }
    };

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
            <div className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Register as a Hospital</h2>
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Hospital Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Services (comma-separated)</label>
                        <input
                            type="text"
                            name="services"
                            value={formData.services}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

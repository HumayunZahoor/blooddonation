import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from '../store/slices/auth';
import { toast } from 'react-toastify';
import { FiChevronDown } from "react-icons/fi";  // React Icons for dropdown arrow

axios.defaults.withCredentials = true;

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { role, isLogin, name } = auth;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/logout`);
            if (response.data === 'Logged out successfully') {
                dispatch(setAuthData({ isLogin: false, role: '', name: '', email: '', id: '' }));
                toast.success(response.data, { type: 'success' });
                navigate('/');
            }
        } catch (error) {
            console.error("Error logging out", error);
            alert("Error logging out. Please try again.");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/getUser`);
                const data = response.data.user;
                dispatch(setAuthData({ isLogin: true, _id: data._id, role: data.role, name: data.name, email: data.email }));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 px-3 relative">
            {/* Logo Section */}
            <div className="flex items-center justify-between w-full md:w-auto">
                <img
                    src="/frees.png"
                    alt="blood Logo"
                    className="h-12 w-12 md:h-14 md:w-14 rounded-3xl m-1 "
                />
                <h2 className="text-2xl font-bold text-white hidden ml-2 md:block">VitalDrops</h2>

                {/* Logout button for small screens */}
                <button
                    className="md:hidden px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-950"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Center Section with Dropdown */}
            <div className="relative flex flex-col items-center md:items-end md:flex-row w-full md:w-auto md:space-x-4">
                <div
                    className="flex items-center space-x-1 cursor-pointer text-white mx-3 font-semibold text-lg transition duration-200 text-center mt-4 md:mt-0 md:text-right"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    <p>Hello, <span className="text-red-600 capitalize ml-1">{name}</span></p>
                    <FiChevronDown className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute top-12 right-0 md:right-3 bg-white shadow-lg rounded-md w-32">
                        <button
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

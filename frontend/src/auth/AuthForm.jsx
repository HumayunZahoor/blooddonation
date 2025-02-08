import React, { useState } from 'react';
import * as Unicons from '@iconscout/react-unicons';
import InputField from '../components/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../store/slices/auth';
import { toast } from 'react-toastify';

export default function AuthForm() {
    const [inputType, setInputType] = useState("loginFormFields");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateInputType = () => {
        setInputType(inputType === "registerFormFiels" ? "loginFormFields" : "registerFormFiels");
    };

    const registerFormFiels = [
        { type: "text", name: "username", placeholder: "Username", required: true },
        { type: "email", name: "email", placeholder: "Email", required: true },
        { type: "password", name: "password", placeholder: "Password", required: true },
        { type: "password", name: "confirmPassword", placeholder: "Confirm Password", required: true },
        { type: "button", name: "Register" }
    ];

    const loginFormFields = [
        { type: "email", name: "email", placeholder: "Email", required: true },
        { type: "password", name: "password", placeholder: "Password", required: true },
        { type: "button", name: "Login" }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        axios.defaults.withCredentials = true;

        if (inputType === "registerFormFiels") {
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/register`, formData)
                .then(res => {
                    const data = res.data;
                    dispatch(setAuthData({ isLogin: true, _id: data._id, role: data.role, name: data.name, email: data.email }));
                    toast.success(data.message);
                    navigate('/BloodDonation/dashboard');
                })
                .catch(err => toast.error(err.response.data.message));
        } else {
            const email = formData.get('email');
            const password = formData.get('password');
            axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`, { email, password })
                .then(res => {
                    const data = res.data;
                    dispatch(setAuthData({ isLogin: true, _id: data._id, role: data.role, name: data.name, email: data.email }));
                    toast.success(data.message);
                    navigate('/BloodDonation/dashboard');
                })
                .catch(err => toast.error(err.response.data.message));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <div className='flex flex-col items-center justify-center'>
                    <img src="/frees.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">SECURED BLOOD DONATION</h1>
                    <h1 className='text-3xl font-bold text-center text-gray-800'>MANAGEMENT SYSTEM</h1>
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    {/* {inputType === "registerFormFiels" ? "Join Us" : "Welcome Back"} */}
                </h2>
                <h3 className="text-lg font-semibold text-center text-gray-600 mb-6">
                    {inputType === "registerFormFiels" ? "Create new account" : "Login to continue"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField props={inputType === "registerFormFiels" ? registerFormFiels : loginFormFields} />
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-700">
                        {inputType === "registerFormFiels" ? "Already have an account?" : "Don't have an account?"}
                        <button
                            className="ml-1 text-red-600 font-bold hover:underline"
                            type="button"
                            onClick={updateInputType}
                        >
                            {inputType === "registerFormFiels" ? "Login" : "Register Now"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
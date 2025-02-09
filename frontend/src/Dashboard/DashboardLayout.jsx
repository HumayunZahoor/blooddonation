import React, { useState, useEffect } from 'react';
import { 
    FaCreditCard, 
    FaTh, 
    FaAngleLeft, 
    FaAngleRight, 
    FaExchangeAlt, 
    FaUsers, 
    FaShoppingBag, 
    FaClipboardList, 
    FaTags, 
    FaFileAlt, 
    FaStore, 
    FaChartPie, 
    FaCogs 
} from 'react-icons/fa';
import { RiDashboardFill, RiProfileLine } from "react-icons/ri";
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DashboardLayout() {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const { role } = auth;

    useEffect(() => {
        const verifyLogin = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/verifyLogin`);
            } catch (error) {
                navigate('/');
            }
        };
        verifyLogin();
    }, [navigate]);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const adminLinks = [
        { href: '/BloodDonation/dashboard', icon: <RiDashboardFill size="18" className="text-gray-950" />, label: 'Dashboard' },
        { href: '/BloodDonation/donor-list', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Manage Donors' },
        { href: '/BloodDonation/hospital-list', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Manage Hospitals' },
        { href: '/BloodDonation/admin-blood-request', icon: <FaCreditCard size="18" className="text-gray-950" />, label: 'Request Blood' },
        { href: '/BloodDonation/blood-stock', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Blood Stock' },
        { href: '/BloodDonation/admin-panel', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Admin Panel' },
        { href: '/BloodDonation/blood-requests-admin', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Manage Requests' },
        { href: '/BloodDonation/asknearbydonor', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Ask Nearby Donor' },
        { href: '/BloodDonation/all-req-to-donor', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'All Requests to Donor' },
        { href: '/BloodDonation/nearby-request-history', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Nearby Request History' },
        { href: '/BloodDonation/all-feedbacks', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'All Feedbacks' },
    ];

    const hospitalLinks = [
        { href: '/BloodDonation/dashboard', icon: <RiDashboardFill size="18" className="text-gray-950" />, label: 'Dashboard' },
        { href: '/BloodDonation/request-blood', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Request Blood' },
        { href: '/BloodDonation/blood-request-history', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Blood Request History' },
        { href: '/BloodDonation/asknearbydonor', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Ask Nearby Donor' },
        { href: '/BloodDonation/nearby-request-history', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Nearby Request History' },
        { href: '/BloodDonation/feedback', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Feedback' },
    ];

    const donorLinks = [
        { href: '/BloodDonation/dashboard', icon: <RiDashboardFill size="18" className="text-gray-950" />, label: 'Dashboard' },
        { href: '/BloodDonation/blood-requests', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Blood Requests' },
        { href: '/BloodDonation/managenearbybloodreq', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Manage Nearby Requests' },
        { href: '/BloodDonation/feedback', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Feedback' },
    ];

    const userLinks = [
        { href: '/BloodDonation/dashboard', icon: <RiDashboardFill size="18" className="text-gray-950" />, label: 'Dashboard' },
        { href: '/BloodDonation/donor-registration', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Donor Registration' },
        { href: '/BloodDonation/hospital-registration', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Hospital Registration' },
        { href: '/BloodDonation/request-blood', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Request Blood' },
        { href: '/BloodDonation/blood-request-history', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Blood Request History' },
        { href: '/BloodDonation/asknearbydonor', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Ask Nearby Donor' },
        { href: '/BloodDonation/nearby-request-history', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Nearby Request History' },
        { href: '/BloodDonation/feedback', icon: <RiProfileLine size="18" className="text-gray-950" />, label: 'Feedback' },
    ];

    const sidebarLinks = () => {
        switch (role) {
            case 'Admin':
                return adminLinks;
            case 'Hospital':
                return hospitalLinks;
            case 'Donor':
                return donorLinks;
            case 'Reciever':
                return userLinks;
            default:
                return [];
        }
    };

    return (
        <div className="relative flex flex-col bg-gray-950">
            <Navbar />
            <div className="w-full flex">
                <div className={`${isSidebarVisible ? 'w-1/6' : 'w-auto'} p-5 min-h-[90vh] bg-transparent text-gray-950 flex flex-col space-y-6 relative`}>
                    <button
                        className="absolute top-2 right-1 bg-white rounded-full shadow p-1 hover:bg-gray-200 transition"
                        onClick={toggleSidebar}
                    >
                        {isSidebarVisible ? (
                            <FaAngleLeft size="25" className="text-gray-600 text-base" />
                        ) : (
                            <FaAngleRight size="25" className="text-gray-600 text-base" />
                        )}
                    </button>

                    {isSidebarVisible && (
                        <div className="space-y-4">
                            {sidebarLinks().map((link) => (
                                <a 
                                    key={link.href} 
                                    href={link.href} 
                                    className="flex items-center space-x-3 p-2 bg-white rounded-md hover:bg-gray-200 transition"
                                >
                                    {link.icon}
                                    <span className="text-xs font-medium text-gray-950">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <div className="min-h-[90vh] w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

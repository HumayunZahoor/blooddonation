// components/Dashboard/Dashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import HospitalDashboard from '../components/Dashboard/HospitalDashboard';
import DonorDashboard from '../components/Dashboard/DonorDashboard';
import ReceiverDashboard from '../components/Dashboard/ReceiverDashboard';


export default function Dashboard() {
    const auth = useSelector((state) => state.auth);
    const { role, isLogin, name } = auth;

    const renderDashboard = () => {
        switch (role) {
            case 'Admin':
                return <AdminDashboard />;
            case 'Hospital':
                return <HospitalDashboard/>
            case 'Donor':
                return <DonorDashboard/>
            case 'Reciever':
                return <ReceiverDashboard/>
            default:
                return <div className="p-8 text-gray-600">No Dashboard Available</div>;
        }
    };

    return <div>{renderDashboard()}</div>;
}

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthForm from './auth/AuthForm';
import DashboardLayout from './Dashboard/DashboardLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard/Dashboard';
import DonorRegistration from './Dashboard/DonorRegistration/DonorRegistration';
import DonorList from './Dashboard/DonorList/DonorList';
import HospitalRegistration from './Dashboard/HospitalRegistration/HospitalRegistration';
import HospitalList from './Dashboard/HospitalList/HospitalList';
import AdminBloodRequest from './Dashboard/AdminBloodRequest/AdminBloodRequest';
import BloodRequests from './Dashboard/AdminBloodRequest/BloodRequests';
import BloodStock from './Dashboard/BloodStock/BloodStock';
import AdminPanel from './Dashboard/AdminPanel/AdminPanel';
import BloodReuestForm from './Dashboard/BloodRequestForm/BloodRequestForm';
import BloodRequestsAdmin from './Dashboard/AdminBloodRequest/BloodRequestsAdmin';
import BloodRequestHistory from './Dashboard/BloodRequestHistory/BloodRequestHistory';
import AskNearByDonor from './Dashboard/asknearbydonor/AskNearByDonor';
import AllReqToDonor from './Dashboard/AllReqToDonor/AllReqToDonor';
import ManageNearByReq from './Dashboard/managenearbybloodreq/ManageNearByReq';
import NearbyRequestHistory from './Dashboard/NearbyRequestHistory/NearbyRequestHistory';
import Feedback from './Dashboard/feedback/Feedback';
import AllFeedbacks from './Dashboard/feedback/AllFeedbacks';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/BloodDonation" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="donor-registration" element={<DonorRegistration />} />
          <Route path="donor-list" element={<DonorList />} />
          <Route path="hospital-registration" element={<HospitalRegistration />} />
          <Route path="hospital-list" element={<HospitalList />} />
          <Route path="admin-blood-request" element={<AdminBloodRequest />} />
          <Route path="blood-requests" element={<BloodRequests />} />
          <Route path="blood-stock" element={<BloodStock />} />
          <Route path="admin-panel" element={<AdminPanel />} />
          <Route path="request-blood" element={<BloodReuestForm />} />
          <Route path="blood-requests-admin" element={<BloodRequestsAdmin />} />
          <Route path="blood-request-history" element={<BloodRequestHistory />} />
          <Route path="asknearbydonor" element={<AskNearByDonor />} />
          <Route path="all-req-to-donor" element={<AllReqToDonor />} />
          <Route path="managenearbybloodreq" element={<ManageNearByReq />} />
          <Route path="nearby-request-history" element={<NearbyRequestHistory />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="all-feedbacks" element={<AllFeedbacks />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

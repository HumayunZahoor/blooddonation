import express from 'express';
import { getAllDonors, toggleDonorStatus , getAllHospitals, toggleHospitalStatus, getAllDonorsbyStatus , requestBlood , initializeBloodBank , getBloodStock , getAllReceivers , getAllBloodRequests} from '../controllers/admin.controller.js';

const adminRoutes = express.Router();

adminRoutes.get('/get-all-donors', getAllDonors);
adminRoutes.patch('/donor-status-toggle/:donorId', toggleDonorStatus)
adminRoutes.get('/get-all-hospitals', getAllHospitals);
adminRoutes.patch('/hospital-status-toggle/:hospitalId', toggleHospitalStatus);
adminRoutes.get("/get-all-donors-by-status", getAllDonorsbyStatus);
adminRoutes.post("/request-blood", requestBlood);
adminRoutes.post("/initialize-blood-bank", initializeBloodBank);
adminRoutes.get("/blood-stock/:adminId", getBloodStock);
adminRoutes.get("/get-all-receivers", getAllReceivers);
adminRoutes.get("/get-all-blood-requests", getAllBloodRequests);

export default adminRoutes;

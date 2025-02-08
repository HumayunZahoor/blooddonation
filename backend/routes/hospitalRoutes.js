import express from 'express';
import { registerHospital , requestBlood , getAllRequests , updateRequestStatus , getUserBloodRequests} from '../controllers/hospital.controller.js';

const hospitalRoutes = express.Router();

hospitalRoutes.post('/register', registerHospital);
hospitalRoutes.post('/request-for-blood', requestBlood)
hospitalRoutes.get("/all-requests", getAllRequests);
hospitalRoutes.put("/update-request/:id", updateRequestStatus);
hospitalRoutes.get("/user-requests/:userId", getUserBloodRequests);

export default hospitalRoutes;

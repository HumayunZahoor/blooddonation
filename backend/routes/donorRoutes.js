import express from 'express';
import { registerDonor , updateDriverLocation , getBloodRequestsForDonor , updateBloodRequestStatus} from '../controllers/donor.controller.js';

const donorRoutes = express.Router();

donorRoutes.post('/register', registerDonor);
donorRoutes.post("/update-location", updateDriverLocation);
donorRoutes.get("/blood-requests/:userId", getBloodRequestsForDonor);
donorRoutes.post("/update-request", updateBloodRequestStatus);
// donorRoutes.get('/', getAllDonors);
// donorRoutes.get('/:id', getDonorById);
// donorRoutes.delete('/:id', deleteDonor);

export default donorRoutes;

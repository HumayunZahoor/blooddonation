import express from 'express';
import { registerDonor , updateDriverLocation , getBloodRequestsForDonor , updateBloodRequestStatus , createBloodRequest , getAllNearByBloodRequests , updateNearByBloodRequestStatus , getUserRequestHistory} from '../controllers/donor.controller.js';

const donorRoutes = express.Router();

donorRoutes.post('/register', registerDonor);
donorRoutes.post("/update-location", updateDriverLocation);
donorRoutes.get("/blood-requests/:userId", getBloodRequestsForDonor);
donorRoutes.post("/update-request", updateBloodRequestStatus);
donorRoutes.post("/blood-request-to-nearby-donor", createBloodRequest);
donorRoutes.get("/all-nearby-blood-requests/:userId", getAllNearByBloodRequests);
donorRoutes.post("/update-nearby-request", updateNearByBloodRequestStatus);
donorRoutes.get("/nearby-request-history/:userId", getUserRequestHistory);
// donorRoutes.get('/', getAllDonors);
// donorRoutes.get('/:id', getDonorById);
// donorRoutes.delete('/:id', deleteDonor);

export default donorRoutes;

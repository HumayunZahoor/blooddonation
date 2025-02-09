import Donor from '../models/donor.model.js';
import mongoose from 'mongoose';
import BloodReq from '../models/bloodReq.model.js';
import BloodBank from '../models/bloodBank.model.js';
import NearBy from '../models/nearby.model.js';

export const registerDonor = async (req, res) => {
    try {
        const { userId, name, email, phone, bloodType, city, lastDonationDate } = req.body;

        // Ensure userId is provided
        if (!userId) return res.status(400).json({ message: "User ID is required." });

        

        // Check if email already exists
        const existingDonor = await Donor.findOne({ email });
        if (existingDonor) return res.status(400).json({ message: "Email is already registered." });

        const newDonor = new Donor({ userId, name, email, phone, bloodType, city, lastDonationDate });
        await newDonor.save();

        res.status(201).json({ message: "Donor registered successfully.", donor: newDonor });
    } catch (error) {
        console.error("Error registering donor:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// -----------------------------------------------------

export const updateDriverLocation = async (req, res) => {
    const { userId, latitude, longitude } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  
    try {
      const driver = await Donor.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(userId) }, 
        { $set: { "location.coordinates": [longitude, latitude] } },
        { new: true, upsert: false } 
      );
  
      if (!driver) {
        return res.status(404).json({ message: "Donor not found" });
      }
  
      res.status(200).json({ message: "Donor location updated successfully", driver });
    } catch (error) {
      console.error("Error updating location:", error);
      res.status(500).json({ message: "Server error, failed to update location" });
    }
  };



// -----------------------------------------------------


export const getDonorById = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);
        if (!donor) return res.status(404).json({ message: "Donor not found." });

        res.status(200).json(donor);
    } catch (error) {
        console.error("Error fetching donor:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// -----------------------------------------------------

export const deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);
        if (!donor) return res.status(404).json({ message: "Donor not found." });

        res.status(200).json({ message: "Donor deleted successfully." });
    } catch (error) {
        console.error("Error deleting donor:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


//-----------------------------------------------------


export const getBloodRequestsForDonor = async (req, res) => {
    try {
        const { userId } = req.params; // User ID from frontend

        // Find donor using userId
        const donor = await Donor.findOne({ userId: new mongoose.Types.ObjectId(userId) });

        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }

        // Find all blood requests for the donor
        const bloodRequests = await BloodReq.find({ donorId: donor._id });

        res.status(200).json({ bloodRequests });
    } catch (error) {
        console.error("Error fetching blood requests:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

//-----------------------------------------------------

export const updateBloodRequestStatus = async (req, res) => {
  try {
      const { requestId, status } = req.body;

      // Validate status
      if (!["Accepted", "Rejected"].includes(status)) {
          return res.status(400).json({ message: "Invalid status" });
      }

      // Find the request
      const bloodRequest = await BloodReq.findById(requestId);
      if (!bloodRequest) {
          return res.status(404).json({ message: "Blood request not found" });
      }

      // Update status
      bloodRequest.status = status;
      await bloodRequest.save();

      // If accepted, update blood stock
      if (status === "Accepted") {
          const bloodBank = await BloodBank.findOne({ adminId: bloodRequest.adminId });

          if (!bloodBank) {
              return res.status(404).json({ message: "Blood bank not found" });
          }

          // Increase blood stock based on blood type
          const bloodTypeKey = bloodRequest.bloodType.replace("+", "_Pos").replace("-", "_Neg");
          bloodBank[bloodTypeKey] = (bloodBank[bloodTypeKey] || 0) + bloodRequest.units;
          await bloodBank.save();
      }

      res.status(200).json({ message: `Blood request ${status.toLowerCase()} successfully` });
  } catch (error) {
      console.error("Error updating blood request status:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
  }
};


//-----------------------------------------------------


export const createBloodRequest = async (req, res) => {
    try {
        const { donorId, userId, bloodType, units } = req.body;

        if (!donorId || !userId || !bloodType || !units) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newRequest = new NearBy({
            donorId,
            userId,
            bloodType,
            units,
        });

        await newRequest.save();
        res.status(201).json({ message: "Blood request submitted successfully.", request: newRequest });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again." });
    }
};


//-----------------------------------------------------
export const getAllNearByBloodRequests = async (req, res) => {
    try {
        const { userId } = req.params; // User ID from frontend

        // Find donor using userId
        const donor = await Donor.findOne({ userId: new mongoose.Types.ObjectId(userId) });

        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }

        // Find all blood requests for the donor
        const bloodRequests = await NearBy.find({ donorId: donor._id });

        res.status(200).json({ bloodRequests });
    } catch (error) {
        console.error("Error fetching blood requests:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// -----------------------------------------------------

export const updateNearByBloodRequestStatus = async (req, res) => {
    try {
        const { requestId, status } = req.body;
  
        // Validate status
        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
  
        // Find the request
        const bloodRequest = await NearBy.findById(requestId);
        if (!bloodRequest) {
            return res.status(404).json({ message: "Blood request not found" });
        }
  
        // Update status
        bloodRequest.status = status;
        await bloodRequest.save();
  
        // If accepted, update blood stock
        if (status === "Accepted") {
            const bloodBank = await BloodBank.findOne(); 

            if (!bloodBank) {
                return res.status(404).json({ message: "Blood bank not found." });
            }
  
            // Increase blood stock based on blood type
            const bloodTypeKey = bloodRequest.bloodType.replace("+", "_Pos").replace("-", "_Neg");
            bloodBank[bloodTypeKey] = (bloodBank[bloodTypeKey] || 0) + bloodRequest.units;
            await bloodBank.save();
        }
  
        res.status(200).json({ message: `Blood request ${status.toLowerCase()} successfully` });
    } catch (error) {
        console.error("Error updating blood request status:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  

  // -----------------------------------------------------


export const getUserRequestHistory = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all blood requests for the given user
        const requests = await NearBy.find({ userId }).sort({ createdAt: -1 });

        if (!requests.length) {
            return res.status(404).json({ message: "No request history found." });
        }

        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching request history:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

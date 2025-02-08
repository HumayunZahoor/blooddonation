import Donor from '../models/donor.model.js';
import User from '../models/users.model.js';
import Hospital from '../models/hospital.model.js';
import BloodReq from '../models/bloodReq.model.js';
import BloodBank from '../models/bloodBank.model.js';
import mongoose from 'mongoose';


// Get all donors
export const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find().sort({ createdAt: -1 });
        res.status(200).json(donors);
    } catch (error) {
        console.error("Error fetching donors:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// Toggle Donor Status (Activate/Inactivate)
export const toggleDonorStatus = async (req, res) => {
    try {
        const { donorId } = req.params;
        const donor = await Donor.findById(donorId);
        
        if (!donor) {
            return res.status(404).json({ message: "Donor not found." });
        }

        // Toggle status field
        donor.status = donor.status === "Active" ? "Inactive" : "Active";
        await donor.save();

        // Find user and update role accordingly
        const user = await User.findById(donor.userId);
        if (user) {
            user.role = donor.status === "Active" ? "Donor" : "Reciever";
            await user.save();
        }

        res.status(200).json({ message: `Donor status updated to ${donor.status}.`, donor });
    } catch (error) {
        console.error("Error updating donor status:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


//-----------------------------------------------------------------------


// Get all hospital requests
export const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find().sort({ createdAt: -1 });
        res.status(200).json(hospitals);
    } catch (error) {
        console.error("Error fetching hospitals:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// Toggle Hospital Status (Activate/Inactivate)
export const toggleHospitalStatus = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const hospital = await Hospital.findById(hospitalId);
        
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }

        // Toggle status field
        hospital.status = hospital.status === "Active" ? "Inactive" : "Active";
        await hospital.save();

        // Find user and update role accordingly
        const user = await User.findById(hospital.userId);
        if (user) {
            user.role = hospital.status === "Active" ? "Hospital" : "Reciever";
            await user.save();
        }

        res.status(200).json({ message: `Hospital status updated to ${hospital.status}.`, hospital });
    } catch (error) {
        console.error("Error updating hospital status:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


//-----------------------------------------------------------------------

export const getAllDonorsbyStatus = async (req, res) => {
    try {
        const donors = await Donor.find({ status: "Active" }).sort({ createdAt: -1 });
        res.status(200).json(donors);
    } catch (error) {
        console.error("Error fetching donors:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// Request Blood from Donor
export const requestBlood = async (req, res) => {
    try {
        const { donorId, adminId, units } = req.body;

        const donor = await Donor.findById(donorId);
        if (!donor) {
            return res.status(404).json({ message: "Donor not found." });
        }

        const newRequest = new BloodReq({
            donorId,
            adminId,
            bloodType: donor.bloodType,
            units,
            status: "Pending",
        });

        await newRequest.save();
        res.status(201).json({ message: "Blood request sent successfully.", request: newRequest });
    } catch (error) {
        console.error("Error making blood request:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

//-----------------------------------------------------------------------



export const initializeBloodBank = async (req, res) => {
    try {
        const { adminId } = req.body;

        if (!adminId) {
            return res.status(400).json({ message: "Admin ID is required." });
        }

        console.log("Received adminId:", adminId); // Debugging

        // Ensure adminId is converted to ObjectId
        const objectId = new mongoose.Types.ObjectId(adminId);

        let bloodBank = await BloodBank.findOne({ adminId: objectId });

        console.log("Existing BloodBank Entry:", bloodBank); // Debugging

        if (!bloodBank) {
            bloodBank = new BloodBank({ adminId: objectId });
            await bloodBank.save();
            return res.status(201).json({ message: "Blood bank initialized successfully.", bloodBank });
        }

        return res.status(200).json({ message: "Blood bank already exists.", bloodBank });
    } catch (error) {
        console.error("Error initializing blood bank:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

//-----------------------------------------------------------------------


export const getBloodStock = async (req, res) => {
    try {
        const { adminId } = req.params;

        // Find blood stock for the given admin
        const bloodStock = await BloodBank.findOne({ adminId });

        if (!bloodStock) {
            return res.status(404).json({ message: "Blood stock not found" });
        }

        res.status(200).json(bloodStock);
    } catch (error) {
        console.error("Error fetching blood stock:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


//-----------------------------------------------------------------------


export const getAllReceivers = async (req, res) => {
    try {
        // Fetch all users
        const users = await User.find();

        // Filter users with role 'Receiver'
        const receivers = users.filter(user => user.role === "Receiver");

        res.status(200).json(receivers);
    } catch (error) {
        console.error("Error fetching receivers:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


//-----------------------------------------------------------------------


export const getAllBloodRequests = async (req, res) => {
    try {
        // Fetch all blood requests with donor and admin details
        const bloodRequests = await BloodReq.find()
            .populate("donorId", "name email") // Fetch donor name & email
            .populate("adminId", "name email"); // Fetch admin name & email

        res.status(200).json(bloodRequests);
    } catch (error) {
        console.error("Error fetching blood requests:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

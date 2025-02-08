import Hospital from '../models/hospital.model.js';
import RequestBlood from '../models/requestblood.model.js';
import BloodBank from '../models/bloodBank.model.js';

export const registerHospital = async (req, res) => {
    try {
        const { userId, name, email, phone, city, address, services } = req.body;

        if (!userId || !name || !email || !phone || !city || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingHospital = await Hospital.findOne({ email });
        if (existingHospital) {
            return res.status(400).json({ message: "Hospital already registered with this email" });
        }

        const newHospital = new Hospital({
            userId,
            name,
            email,
            phone,
            city,
            address,
            services,
            status: 'Inactive'
        });

        await newHospital.save();
        res.status(201).json({ message: "Hospital registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


//---------------------------------------------------------


// Request blood from Receiver or Hospital
export const requestBlood = async (req, res) => {
    try {
        const { userId, bloodType, units } = req.body;

        if (!userId || !bloodType || !units) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRequest = new RequestBlood({ userId, bloodType, units });
        await newRequest.save();

        return res.status(201).json({ message: "Blood request submitted successfully", request: newRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

//---------------------------------------------------------


// Get all blood requests
export const getAllRequests = async (req, res) => {
    try {
        const requests = await RequestBlood.find().populate("userId", "name email");
        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// ---------------------------------------------------------


export const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, dispatched } = req.body;

        // Find the blood request
        const request = await RequestBlood.findById(id);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // If status is "Accepted", update the Blood Bank stock
        if (status === "Accepted") {
            const bloodTypeKey = request.bloodType.replace("+", "_Pos").replace("-", "_Neg");

            // Find the blood bank stock
            const bloodBank = await BloodBank.findOne();
            if (!bloodBank || bloodBank[bloodTypeKey] < request.units) {
                return res.status(400).json({ message: "Insufficient blood stock" });
            }

            // Reduce the blood stock
            bloodBank[bloodTypeKey] -= request.units;
            await bloodBank.save();
        }

        // Update request status and dispatched flag
        if (status) request.status = status;
        if (dispatched !== undefined) request.dispatched = dispatched;

        await request.save();

        res.status(200).json({ message: "Request updated successfully", request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ---------------------------------------------------------


export const getUserBloodRequests = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const requests = await RequestBlood.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({ requests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

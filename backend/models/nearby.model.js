import mongoose from "mongoose";

const BloodReqSchema = new mongoose.Schema(
    {
        donorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Donor",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
        },
        units: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Accepted", "Rejected"],
            default: "Pending",
        }
    },
    { timestamps: true }
);

const NearBy = mongoose.model("NearBy", BloodReqSchema);

export default NearBy;

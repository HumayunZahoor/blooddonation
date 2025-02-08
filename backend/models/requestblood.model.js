import mongoose from "mongoose";

const RequestBloodSchema = new mongoose.Schema(
    {
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
        },
        dispatched: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

const RequestBlood = mongoose.model("RequestBlood", RequestBloodSchema);

export default RequestBlood;

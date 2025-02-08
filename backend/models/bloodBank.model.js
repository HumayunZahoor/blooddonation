import mongoose from "mongoose";

const BloodBankSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    A_Pos: { type: Number, default: 0 },
    A_Neg: { type: Number, default: 0 },
    B_Pos: { type: Number, default: 0 },
    B_Neg: { type: Number, default: 0 },
    O_Pos: { type: Number, default: 0 },
    O_Neg: { type: Number, default: 0 },
    AB_Pos: { type: Number, default: 0 },
    AB_Neg: { type: Number, default: 0 },
}, { timestamps: true });

const BloodBank = mongoose.model("BloodBank", BloodBankSchema);

export default BloodBank;

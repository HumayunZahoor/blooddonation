import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true },
    bloodType: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
    city: { type: String, required: true },
    lastDonationDate: { type: Date, default: null },
    isAvailabe: { type: Boolean, default: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' },
    location: { 
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] }
      },
    createdAt: { type: Date, default: Date.now }
});

const Donor = mongoose.model('Donor', donorSchema);
export default Donor;

import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    services: { type: [String], default: [] },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Inactive' },
    createdAt: { type: Date, default: Date.now }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;

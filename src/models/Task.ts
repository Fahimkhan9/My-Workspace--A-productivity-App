import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);

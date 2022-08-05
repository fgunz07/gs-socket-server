import mongoose from "mongoose";

export interface SocketDocument extends mongoose.Document {
    socket_id: string;
    namespace: string;
    createdAt: Date;
    updatedAt: Date;
}

const socketSchema = new mongoose.Schema({
    socket_id: { type: String, required: true, unique: true },
    namespace: { type: String, required: true },
}, {
    timestamps: true
});

const SocketModel = mongoose.model<SocketDocument>("Socket", socketSchema);

export default SocketModel;

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    name: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(key: string): Promise<boolean>
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true},
    password: { type: String, required: true }
}, {
    timestamps: true
});

userSchema.pre("save", async function(next: mongoose.CallbackWithoutResultAndOptionalError) {
    const user = this as UserDocument;

    if(!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function(key: string): Promise<boolean> {
    const user = this as UserDocument;

    return await bcrypt.compare(key, user.password).catch((error) => false);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
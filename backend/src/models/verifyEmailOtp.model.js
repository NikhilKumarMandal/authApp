import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
    {
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
            type: Date,
            default: Date.now(),
            expires: '10m'
    }
    },
    {
        timestamps: true
       }
)

export const Otp = mongoose.model("Otp", otpSchema)
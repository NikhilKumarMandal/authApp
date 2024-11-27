import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import crypto from "crypto";
import { type } from "os";


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password is required only if googleId is not present
      },
    },
    refreshToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    otp: {
      type: String,
    },
    otpExpire: {
      type: Date,
    },
    googleId: {
      type: String, // Store the unique Google ID for OAuth users
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateOtp = function () { 
    const otpgenrate = Math.floor(1000 + Math.random() * 9000);
    const expireOtp = Date.now() + (15 * 60 * 1000)

    return {otp: otpgenrate, otpExpire: expireOtp}
}

userSchema.methods.generateForgetPasswordToken = function(){

    const forgetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(forgetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 20 * 60 * 1000

    return forgetToken;
}

export const User = mongoose.model("User", userSchema)
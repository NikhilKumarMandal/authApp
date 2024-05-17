import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        name: {
          type: String,
          required: [true, "Please enter your name"],
        },
        email: {
          type: String,
          required: [true, "Please enter your email"],
          unique: true,
        },
        password: {
          type: String,
          required: [true, "Please enter your password"],
        },
        refreshToken: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,   
        resetPasswordExpire: String,
        otp: {
            type: String,
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

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

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

export const User = mongoose.model("User", userSchema)
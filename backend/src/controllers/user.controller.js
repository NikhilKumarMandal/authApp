import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken" 
import mongoose from "mongoose"
import { sendEmailVerification, verifyemail,resetPassword } from "../utils/sendEmailVerification.js"
import crypto from "crypto";
import axios from "axios"


export const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const OTP_EXPIRATION_MINUTES = 15;

// TEST CASE PASS
const registerUser = asyncHandler( async (req, res) => {
     const {username,email,password} = req.body

     if (
        [username,email,password].some((field) => field.trim() === "")
     ) {
        throw new ApiError(400,"All fields are requried")
     }

        const existedUser =  await User.findOne({
            email
         })
    
        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists")
        }
        
        const user = await User.create({
            username,
            email,
            password,
        })
    
   
    
        const createdUser = await User.findById(user._id).select(
            "-password "
        )
    
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        
        const { otp, otpExpire } = createdUser.generateOtp()
        
        createdUser.otp = otp
        createdUser.otpExpire = otpExpire
        await createdUser.save({validateBeforeSave:false})
        await sendEmailVerification({
            email: createdUser.email,
            subject: "verifY email",
            mailgenContent: verifyemail(createdUser.name,otp)
        })
    
        return res.status(201)
        .json(
            new ApiResponse(
                200, 
                createdUser, 
                "User registered Successfully"
            )
        )
   
    
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { otp } = req.body;

    if (!otp) {
        throw new ApiError(400, "OTP is required");
    }

    // Fetch user
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    if (user.isVerified) {
        throw new ApiError(400, "User is already verified");
    }

    // Validate OTP
    if (user.otp !== otp) {
        return res.status(400).json(new ApiResponse(400, "Invalid OTP, a new OTP has been sent to your email"));
    }

    // Check if OTP is expired
    const isOtpExpired = Date.now() > new Date(user.otpExpire).getTime() + OTP_EXPIRATION_MINUTES * 60 * 1000;
    if (isOtpExpired) {
        return res.status(400).json(new ApiResponse(400, "OTP has expired"));
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    return res.status(200).json(new ApiResponse(
        200,
        user,
        "User verified successfully"
    ));
});

const resendEmail = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid user ID");
    }

    try {
        const user = await User.findById(id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const { otp, otpExpire } = user.generateOtp();

        user.otp = otp;
        user.otpExpire = otpExpire;
        await user.save({ validateBeforeSave: false });

        await sendEmailVerification({
            email: user.email,
            subject: "Verify Email",
            mailgenContent: verifyemail(user.name, otp)
        });

        return res.status(201).json(new ApiResponse(200, null, "Send OTP successfully"));
    } catch (error) {
        console.log("Error: ", error);
        throw new ApiError(500, "Something went wrong while sending OTP");
    }
});

const loginUser = asyncHandler(async (req, res) =>{

    const { email,password } = req.body


    if (!email ) {
        throw new ApiError(400, "email is required")
    }
    
    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    if (!user.isVerified) {
        throw new ApiError(404,"Your are not verifed, Go and verifed your self first")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)
   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

   const loggedInUser = await User.findById(user._id).select("-password");

   const options = {
    httpOnly: true, 
    secure: true, 
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {

     await User.findByIdAndUpdate(
         req.user._id,
         {
             $unset: {
                 refreshToken: 1 
             }
         },
         {
             new: true
         }
     )
 
     const options = {
         httpOnly: true,
         secure: true,
         sameSite: 'none',
         expires: new Date(0)
     }
 
     return res
     .status(200)
     .clearCookie("accessToken", options)
     .clearCookie("refreshToken", options)
     .json(
         new ApiResponse(
             200,
             {},
             "User logged Out"
             )
         )

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;
  
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }
  
    try {
      const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findById(decodedToken?._id);
      if (!user) {
        throw new ApiError(401, "Invalid refresh token");
      }
      
      
     
      if (incomingRefreshToken !== user?.refreshToken) {
        // If token is valid but is used already
        throw new ApiError(401, "Refresh token is expired or used");
      }
      
      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };
  
      const { accessToken, refreshToken: newRefreshToken } =
        await generateAccessAndRefereshTokens(user?._id);
  
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
          new ApiResponse(
            200,
            { },
            "Access token refreshed"
          )
        );
    } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async(req,res) => {

    const {newPassword,oldPassword} = req.body

    const user = await User.findById(req.user._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully"
            )
        )  

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(req.user)
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, "All fields are required");
    }

    const prevUser = await User.findById(req.user?._id);

    if (!prevUser) {
        throw new ApiError(404, "User not found");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                name,
            }
        },
        {
            new: true
        }
    ).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const forgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return new ApiError(400, "User does not exist")
    }

    // Generate a forget password token
    const forgetToken = user.generateForgetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create the reset URL
    const myUrl = `http://localhost:5173/reset-password/${forgetToken}`;

    try {
        // Send the email
        await sendEmailVerification({
            email: user.email, 
            subject: " Password reset email",
            mailgenContent: resetPassword(user.name, myUrl)
        });

        // Return success response
        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Password reset mail has been sent to your email id"
            )
        );
    } catch (error) {
        // Handle email sending error
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ApiError(500, error.message));
    }
});

const passwordReset = asyncHandler(async (req, res, next) => {
    const token = req.params.token;
    const encryToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken: encryToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ApiError(400, "Token is invalid or expired"));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ApiError(400, "Password and confirm password do not match"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password reset successfully"
        )
    );
});

//  api/v1/users/?search=nikhil
const allUsers = asyncHandler(async (req, res) => {
     try {
        const searchQuery = req.query.search;
        const keyword = searchQuery ? {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } }
            ]
        } : {};

        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

        res.status(200).json(new ApiResponse(200, users, "Search user successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, "An error occurred while searching for users"));
    }
    
})

const googleAuth = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(400, "Token is required!");
  }

  const googleToken = token;
  const googleOauthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
  googleOauthUrl.searchParams.set("id_token", googleToken);

  const { data } = await axios.get(googleOauthUrl.toString(), {
    responseType: "json",
  });

  let user = await User.findOne({ email: data.email });

  // If the user does not exist, create a new user with googleId
  if (!user) {
    user = await User.create({
      username: data.name,
      email: data.email,
      isVerified: data.email_verified,
      avatar: data.picture,
      googleId: data.sub,
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});


  
export {
    registerUser,
    verifyEmail,
    resendEmail,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    passwordReset,
    forgetPassword,
    allUsers,
    googleAuth
 }
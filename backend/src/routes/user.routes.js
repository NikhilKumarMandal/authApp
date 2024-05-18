import { Router } from "express";
import {
     registerUser,
     loginUser,
     logoutUser,
     refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    verifyEmail,
    forgetPassword,
    passwordReset
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()




router.route("/register").post(registerUser)

router.route("/verify-email").post(verifyEmail)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)


router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/forget-password").post(forgetPassword)
router.route("/password/reset/:token").post(passwordReset)



export default router
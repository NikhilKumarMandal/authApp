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
    passwordReset,
    resendEmail,
    allUsers,
    googleAuth
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()




router.route("/register").post(registerUser)
router.route("/google").post(googleAuth)

router.route('/verify-email/:id').post(verifyEmail)
router.route('/resendEmail/:id').post(resendEmail)
router.route("/login").post(loginUser)


router.route("/forget-password").post(forgetPassword)
router.route("/password/reset/:token").post(passwordReset)

//secured routes


router.route("/logout").post(verifyJWT, logoutUser)

router.route("/").post(verifyJWT,allUsers)


router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)




export default router
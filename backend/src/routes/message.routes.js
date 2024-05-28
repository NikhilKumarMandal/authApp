import { Router } from "express";
import {
    sendMessage,
    allMessage
} from "../controllers/message.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/").post(verifyJWT,sendMessage)
router.route("/:chatId").get(verifyJWT,allMessage)




export default router
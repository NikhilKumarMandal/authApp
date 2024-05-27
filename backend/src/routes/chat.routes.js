import { Router } from "express";
import {
    accessChat,
    allChats,
    createGroup,
    changeGroupName,
    addToGroup,
    removeToGroup
} from "../controllers/chat.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/").post(verifyJWT,accessChat)
router.route("/").get(verifyJWT,allChats)
router.route("/group").get(verifyJWT,createGroup)
router.route("/group/rename").put(verifyJWT,changeGroupName)
router.route("/group/addusers").put(verifyJWT,changeGroupName)
router.route("/group/addusers").post(verifyJWT,addToGroup)
router.route("/group/removeusers").put(verifyJWT,removeToGroup)





export default router
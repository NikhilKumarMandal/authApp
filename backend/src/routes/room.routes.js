import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createRoom, getAllRooms } from "../controllers/room.controller.js";
const router = Router()

router.route("/createRoom").post(verifyJWT,createRoom)
router.route("/rooms").get(verifyJWT,getAllRooms)

export default router
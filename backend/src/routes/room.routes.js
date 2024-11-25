import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createRoom } from "../controllers/room.controller.js";
const router = Router()

router.route("/createRoom").post(verifyJWT,createRoom)

export default router
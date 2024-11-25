import roomModel from "../models/room.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createRoom = asyncHandler(async (req, res) => {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
        throw new ApiError(400,"All fileds are required!")
    }

    console.log("User",req.user._id)
    const owner = req.user._id
    const room = await roomModel.create({
        topic,
        roomType,
        owner,
        speakers: [owner]
    })

    res.status(200).json(new ApiResponse(
        200,
        room,
        "Room created successfully"
    ))
})

export {
    createRoom
}
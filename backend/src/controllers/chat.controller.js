import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Chat } from "../models/chat.model.js"

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json(new ApiResponse(400, null, "UserId does not exist"));
    }

    try {
        let isChat = await Chat.find({
            isGroupChat: false,
            users: { $all: [req.user._id, userId] }
        })
        .populate("users", '-password')
        .populate("latestMessage");

        if (isChat.length > 0) {
            isChat = await User.populate(isChat, {
                path: "latestMessage.sender",
                select: "name email"
            });

            return res.status(200).json(new ApiResponse(200, isChat[0], "Chat fetched successfully"));
            
        } else {
            const chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId]
            };

            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");

            return res.status(200).json(new ApiResponse(200, fullChat, "Chat created successfully"));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong"));
    }
});




export {
    accessChat
}
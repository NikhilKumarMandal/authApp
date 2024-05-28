import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { Chat } from "../models/chat.model.js"
import { Message } from "../models/message.model.js"

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        throw new ApiError(400, "Invalid data passed into request");
    }

    try {
        // Create the message
        let message = await Message.create({
            sender: req.user._id,
            content,
            chat: chatId
        });

        // Populate sender and chat details
        message = await message.populate("sender", "name").populate({
            path: "chat",
            populate: {
                path: "users",
                select: "name email"
            }
        });

        // Update the chat with the latest message
        const updatedChat = await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        },
        { new: true }
        );

        // Respond with the updated chat and success message
        return res.status(200).json(new ApiResponse(200, updatedChat, "Message sent successfully"));
        
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong while sending the message"));
    }
});

const allMessage = asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    if (!chatId) {
        throw new ApiError(400, "Please provide chatId");
    }

    try {
        const allMessages = await Message.find({ chat: chatId })
            .populate("sender", "name email")
            .populate("chat");
        
        return res.status(200).json(new ApiResponse(200, allMessages, "Messages fetched successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong while fetching data"));
    }
});



export {
    sendMessage,
    allMessage
}
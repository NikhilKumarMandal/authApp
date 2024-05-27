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

const allChats = asyncHandler(async (req, res) => {

    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 });

        await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name email"
        });

        return res.status(200).json(new ApiResponse(200, chats, "Fected chat successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, error.message));
    }
});

const createGroup = asyncHandler(async (req, res) => {
    const { users, name } = req.body;

    // Validate the input
    if (!users || !name) {
        throw new ApiError(400, "All fields are required");
    }

    const user = JSON.parse(users);

    // Ensure at least two members
    if (user.length < 2) {
        throw new ApiError(400, "At least 2 members are required to create a group");
    }

    // Add the current user to the group
    user.push(req.user);

    try {
        // Create the group chat
        const group = await Chat.create({
            chatName: name,
            users: user,
            isGroupChat: true,
            groupAdmin: req.user
        });

        // Populate the created group chat
        const fullGroupChat = await Chat.findOne({ _id: group._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        // Return the response with the created group chat
        return res.status(200).json(new ApiResponse(200, fullGroupChat, "Group created successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong while creating the group"));
    }
});

const changeGroupName = asyncHandler(async (req, res) => {
    const { chatName, chatId } = req.body;

    // Validate input
    if (!chatName || !chatId) {
        throw new ApiError(400, "chatName and chatId are required");
    }

    try {
        const updatedGroup = await Chat.findByIdAndUpdate(
            chatId,
            { chatName },
            { new: true }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password");

        if (!updatedGroup) {
            throw new ApiError(400, "Chat not found");
        }

        return res.status(200).json(new ApiResponse(200, updatedGroup, "Group name changed successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong while changing group name"));
    }
});

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    // Validate input
    if (!chatId || !userId) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        // Add the user to the group
        const add = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!add) {
            throw new ApiError(400, "Chat not found");
        }

        return res.status(200).json(new ApiResponse(200, add, "User added successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong while adding the user to the group"));
    }
});


const removeToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    // Validate input
    if (!chatId || !userId) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        // Add the user to the group
        const remove = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!remove) {
            throw new ApiError(400, "Chat not found");
        }

        return res.status(200).json(new ApiResponse(200, remove, "User added successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(500, null, "Something went wrong while adding the user to the group"));
    }
});





export {
    accessChat,
    allChats,
    createGroup,
    changeGroupName,
    addToGroup,
    removeToGroup

}
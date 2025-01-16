import User from "../models/user.model.js";
import MessageModel from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    return res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  const { id: targetUser } = req.params;
  const loggedInUser = req.user._id.toString();
  console.log(targetUser, loggedInUser);
  if (!targetUser)
    return res
      .status(404)
      .json({ status: "error", message: "target user id required" });
  try {
    const messages = await MessageModel.find({
      $or: [
        { senderId: loggedInUser, receiverId: targetUser },
        { senderId: targetUser, receiverId: loggedInUser },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json({
      status: "success",
      data: messages,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ status: "success", message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  const senderId = req.user._id;
  const { id: receiverId } = req.params;
  if (!senderId || !receiverId)
    return res.status(404).json({ message: "receiver id is required" });
  try {
    const { message, image } = req.body;
    if (!message && !image)
      return res.status(400).json({ message: "message or image is required" });

    let imageUrl = "";
    if (image) {
      imageUrl = (await cloudinary.uploader.upload(image)).secure_url;
    }

    const response = await MessageModel.create({
      senderId: senderId,
      receiverId: receiverId,
      message,
      image: imageUrl,
    });

    // todo: implement socket.io to send message to receiver
    return res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

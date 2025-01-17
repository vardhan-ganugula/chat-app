import { signupSchema, loginSchema } from "../lib/zodSchema.lib.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export async function signup(req, res) {
  const details = req.body;
  const validatedDetails = signupSchema.safeParse(details);
  if (!validatedDetails.success) {
    return res.status(400).json({
      status: "error",
      message: validatedDetails.error.errors,
    });
  }
  const { email, password, username } = validatedDetails.data;

  // check if user exists or not

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = generateToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function login(req, res) {
  const details = req.body;
  const parsedDetails = loginSchema.safeParse(details);
  if (!parsedDetails.success) {
    return res.status(400).json({
      status: "error",
      message: parsedDetails.error.errors,
    });
  }

  const { email, password } = parsedDetails.data;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({
        status: "success",
        message: "User logged in successfully",
        data: {
          email: user.email,
          username: user.username,
          _id: user._id,
        },
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function logout(req, res) {
  return res.cookie("token", "").json({
    status: "success",
    message: "User logged out successfully",
  });
}

export async function updateProfile(req, res) {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({
        status: "error",
        message: "Profile picture is required",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updateUser = await User.findByIdAndUpdate(
      {_id:userId},
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        email: updateUser.email,
        username: updateUser.username,
        profilePic: updateUser.profilePic,
      },
    });



  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function getProfile(req, res) {
  try {
    return res.status(200).json(req.user);   
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
    
  }
}
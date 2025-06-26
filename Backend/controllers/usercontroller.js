import User from "../models.js/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../uttils/datauri.js";
import cloudinary from "../uttils/cloudinary.js";

const registeruser = async (req, res) => {
  try {
    const { FullName, email, phoneNumber, password, role } = req.body;

    if (!FullName || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const file = req.file;

    let profilePicUrl = "";
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePicUrl = cloudResponse.secure_url;
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      FullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePic: profilePicUrl, // Always set, empty string if no file
      },
    });
    if (user) {
      return res
        .status(200)
        .json({ message: "User registered successfully", success: true });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const loginuser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required ", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Password does not match", success: false });
    }
    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: "Role does not match", success: false });
    }
    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const userData = {
      _id: user._id,
      FullName: user.FullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true, // Fixed typo
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.FullName}`,
        success: true,
        userData,
        token,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const logoutuser = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { FullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    let userId = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    if (FullName) user.FullName = FullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // resuma come later her
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
    await user.save();
    const userData = {
      _id: user._id,
      FullName: user.FullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      userData,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export { registeruser, loginuser, logoutuser, updateProfile };

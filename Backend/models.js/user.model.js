import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      profilePic: {
        type: String,
        default: "",
      },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

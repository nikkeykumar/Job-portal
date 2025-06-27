import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/job_portal");
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("error to connecting mongodb ", error.message);
  }
};
export default connectionDB;

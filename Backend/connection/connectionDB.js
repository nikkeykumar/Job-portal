import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/job_portal");
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("error to connecting mongodb ", error.message);
  }
};
export default connectionDB;

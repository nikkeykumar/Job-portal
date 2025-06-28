import dotenv from "dotenv";
dotenv.config({});
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import connectionDB from "./connection/connectionDB.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import application from "./routes/application.route.js";
import path from "path";
const app = express();
const _dirname = path.resolve();
//Middleware//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://job-portal-c4u0.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));
//Routes//
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", application);
app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

// server//
const port = process.env.PORT || 8000;
app.listen(port, () => {
  connectionDB();
  console.log(`server listen ${port}`);
});

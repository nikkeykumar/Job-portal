import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  loginuser,
  logoutuser,
  registeruser,
  updateProfile,
} from "../controllers/usercontroller.js";
import { singalUpload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", singalUpload, registeruser);
router.post("/login", loginuser);
router.get("/logout", logoutuser);
router.put("/update/profile", isAuthenticated, singalUpload, updateProfile);

export default router;

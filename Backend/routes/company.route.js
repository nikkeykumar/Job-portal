import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getallcompanies,
  getCompaniById,
  registercompany,
  updateCompany,
} from "../controllers/companycontroller.js";
import { singalUpload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", isAuthenticated, registercompany);
router.get("/getallcompanies", isAuthenticated, getallcompanies);
router.get("/get/:id", isAuthenticated, getCompaniById);
router.put("/updatecompany/:id", isAuthenticated, singalUpload, updateCompany);

export default router;

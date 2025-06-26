import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 
import { getAdminjob, getalljobs, getjobById, postjob } from "../controllers/job.controller.js";
const router = express.Router();

router.post("/post", isAuthenticated, postjob);
router.get("/get", isAuthenticated,getalljobs );
router.get("/get/:id", isAuthenticated, getjobById );
router.get("/getadminjob", isAuthenticated, getAdminjob);

export default router;

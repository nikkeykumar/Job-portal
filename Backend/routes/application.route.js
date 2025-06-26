 import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyjob, getaplliedjob, getapplicants, updatestatus } from "../controllers/applicationcontroller.js";

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applyjob);
router.get("/get", isAuthenticated, getaplliedjob);
router.get("/applicants/:id", isAuthenticated, getapplicants);
router.post("/status/:id/update", isAuthenticated, updatestatus);

export default router;

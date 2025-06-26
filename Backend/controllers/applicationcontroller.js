import { application } from "../models.js/application.model.js";
import { job } from "../models.js/job.model.js";
export const applyjob = async (req, res) => {
  try {
    const userId = req.user;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "jobId is required", success: false });
    }
    const existsingApplication = await application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existsingApplication) {
      return res
        .status(400)
        .json({ message: " you already applied for this job", success: false });
    }
    const Job = await job.findById(jobId);
    if (!Job) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    const newApplication = await application.create({
      job: jobId,
      applicant: userId,
    });
    Job.application.push(newApplication._id);
    await Job.save();
    return res
      .status(201)
      .json({ message: "Job applied successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getaplliedjob = async (req, res) => {
  try {
    const userId = req.user;
    const applicant = await application
      .find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { sort: { createdAt: -1 }, path: "company" },
      });
    if (!applicant) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }
    return res.status(200).json({
      message: "Applications retrieved successfully",
      success: true,
      applicant,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getapplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const Job = await job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });
    if (!Job) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    return res.status(200).json({
      message: "applicants retrieved successfully",
      success: true,
      Job,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const updatestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "status is required", success: false });
    }
    const Application = await application.findOne({ _id: applicationId });
    if (!Application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }
    Application.status = status.toLowerCase();
    await Application.save();
    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

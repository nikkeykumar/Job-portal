import { job } from "../models.js/job.model.js";

export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobtype,
      position,
      experienceLeval,
      companyId,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobtype ||
      !position ||
      !experienceLeval ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "Some thing is missing", success: false });
    }
    let userId = req.user;
    const Job = await job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobtype,
      experienceLeval,
      position,
      company: companyId,
      created_by: userId,
    });
    return res
      .status(201)
      .json({ message: "Job created successfully", success: true, Job });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getalljobs = async (req, res) => {
  try {
    const keyweord = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyweord, $options: "i" } },
        { description: { $regex: keyweord, $options: "i" } },
      ],
    };
    const jobs = await job
      .find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(400).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Jobs retrieved successfully", success: true, jobs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getjobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobdata = await job.findById(jobId).populate({
      path: "application",
    });
    if (!jobdata) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "job retrieved successfully", success: true, jobdata });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getAdminjob = async (req, res) => {
  try {
      
    const adminId = req.user;
    const jobs = await job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Jobs retrieved successfully", success: true, jobs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

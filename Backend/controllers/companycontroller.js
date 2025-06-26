import { Company } from "../models.js/company.model.js";
import getDataUri from "../uttils/datauri.js";
import cloudinary from "../uttils/cloudinary.js";
export const registercompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "company name is required", success: false });
    }
    let company = await Company.findOne({ name: name });
    if (company) {
      return res
        .status(400)
        .json({ message: "company already exists", success: false });
    }
    company = await Company.create({
      name: name,
    });
    return res.status(200).json({
      message: "company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getallcompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    if (!companies) {
      return res
        .status(400)
        .json({ message: "No companies found", success: false });
    }
    return res.status(200).json({
      message: "Companies retrieved successfully",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const getCompaniById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({
      message: "Company retrieved successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    if (!name || !description || !website || !location) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const file = req.file;

    // Build the update object
    const companydata = { name, description, website, location };

    // Only process logo if a file is uploaded
    if (file) {
      const fileUrl = getDataUri(file);
      const CloudRespones = await cloudinary.uploader.upload(fileUrl.content);
      companydata.logo = CloudRespones.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      companydata,
      { new: true }
    );
    if (!company) {
      return res
        .status(400)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

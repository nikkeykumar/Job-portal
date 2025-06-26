import mongoose from "mongoose";
const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);
export const Company = mongoose.model("Company", CompanySchema);

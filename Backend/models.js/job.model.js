import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    requirements: [{ type: String }],

    salary: { type: Number, require: true },
    location: { type: String, require: true },
    jobtype: { type: String, require: true },
    position: { type: Number, require: true },
    experienceLeval: { type: Number, require: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      require: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    application: [{ type: mongoose.Schema.Types.ObjectId, ref: "application" }],
  },
  { timestamps: true }
);
export const job = mongoose.model("job",jobSchema)
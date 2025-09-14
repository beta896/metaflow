import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    verdict: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // ⏱️ Automatically adds createdAt and updatedAt
  }
);

const Audit = mongoose.model("Audit", auditSchema);

export default Audit;
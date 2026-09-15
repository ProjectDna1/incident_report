import mongoose from "mongoose";

const caseUpdateSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
    },

    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updateType: {
      type: String,
      enum: [
        "Investigation Update",
        "Administrative Update",
        "Evidence Update",
        "Status Update",
        "Case Review",
      ],
      default: "Investigation Update",
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    publicView: {
      type: Boolean,
      default: false,
    },

    attachment: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const CaseUpdate = mongoose.model("CaseUpdate", caseUpdateSchema);

export default CaseUpdate;
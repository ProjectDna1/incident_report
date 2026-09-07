import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    // User who submitted the incident
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic incident information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    incidentType: {
      type: String,
      required: true,
      enum: [
        "Theft",
        "Robbery",
        "Assault",
        "Burglary",
        "Fraud",
        "Vandalism",
        "Missing Person",
        "Drug Related",
        "Domestic Violence",
        "Other",
      ],
    },

    // Where the incident happened
    location: {
      address: {
        type: String,
        required: true,
        trim: true,
      },

      latitude: {
        type: Number,
        default: null,
      },

      longitude: {
        type: Number,
        default: null,
      },
    },

    // When the incident happened
    incidentDate: {
      type: Date,
      required: true,
    },

    // How serious the incident is
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    // Current state of the incident
    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Assigned",
        "Under Investigation",
        "Resolved",
        "Closed",
        "Rejected",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;

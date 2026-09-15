import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    // Incident being assigned
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
    },

    // Investigator receiving the assignment
  investigator: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: false,
  default: null,
},

    // Admin who made the assignment
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Assignment status
status: {
  type: String,
  enum: [
    "Unassigned",
    "Assigned",
    "Accepted",
    "In Progress",
    "Completed",
    "Cancelled",
  ],
  default: "Unassigned",
},

    // Optional instructions from the admin
    instructions: {
      type: String,
      trim: true,
      default: "",
    },

    // Date the assignment was made
    assignedAt: {
      type: Date,
      default: Date.now,
    },

    // Date the investigator completed the assignment
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;

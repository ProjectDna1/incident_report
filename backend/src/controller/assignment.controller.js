import Assignment from "../models/Assignment.js";
import Incident from "../models/Incident.js";
import User from "../models/User.js";


// Create Assignment
export const createAssignment = async (req, res) => {
  try {
    const { incidentId, investigatorId, instructions } = req.body;

    // Incident is always required
    if (!incidentId) {
      return res.status(400).json({
        message: "Incident is required",
      });
    }

    // Check that the incident exists
    const incident = await Incident.findById(incidentId);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    // Investigator is optional
    let investigator = null;

    if (investigatorId) {
      investigator = await User.findById(investigatorId);

      if (!investigator) {
        return res.status(404).json({
          message: "Investigator not found",
        });
      }

      if (investigator.role !== "investigator") {
        return res.status(400).json({
          message: "Selected user is not an investigator",
        });
      }
    }

    // Prevent duplicate active assignments
    const existingAssignment = await Assignment.findOne({
      incident: incidentId,
      status: {
        $in: [
          "Unassigned",
          "Assigned",
          "Accepted",
          "In Progress",
        ],
      },
    });

    if (existingAssignment) {
      return res.status(400).json({
        message: "This incident already has an active assignment",
      });
    }

    // Create assignment
    const assignment = await Assignment.create({
      incident: incidentId,
      investigator: investigatorId || null,
      assignedBy: req.user._id,
      instructions: instructions || "",
      status: investigatorId ? "Assigned" : "Unassigned",
    });

    // Update incident status
    incident.status = investigatorId ? "Assigned" : "Pending";
    await incident.save();

    // Return populated assignment
    const populatedAssignment = await Assignment.findById(
      assignment._id
    )
      .populate("incident")
      .populate("investigator", "fullName email role")
      .populate("assignedBy", "fullName email");

    res.status(201).json({
      message: investigatorId
        ? "Incident assigned successfully"
        : "Incident added to unassigned queue",
      assignment: populatedAssignment,
    });
  } catch (error) {
    console.error("Error creating assignment:", error);

    res.status(500).json({
      message: "Server error while creating assignment",
    });
  }
};

// GET ALL ASSIGNMENTS
// Admin can view all assignments
// GET /api/assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("incident")
      .populate("investigator", "fullName email role")
      .populate("assignedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      assignments,
    });
  } catch (error) {
    console.error("Error getting assignments:", error);

    res.status(500).json({
      message: "Server error while getting assignments",
    });
  }
};

// GET MY ASSIGNMENTS
// Investigator sees cases assigned to them
// GET /api/assignments/my
export const getMyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      investigator: req.user._id,
    })
      .populate("incident")
      .populate("assignedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      assignments,
    });
  } catch (error) {
    console.error("Error getting investigator assignments:", error);

    res.status(500).json({
      message: "Server error while getting assignments",
    });
  }
};

// GET ONE ASSIGNMENT
// GET /api/assignments/:id
export const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("incident")
      .populate("investigator", "fullName email role")
      .populate("assignedBy", "fullName email");

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      assignment,
    });
  } catch (error) {
    console.error("Error getting assignment:", error);

    res.status(500).json({
      message: "Server error while getting assignment",
    });
  }
};

// UPDATE ASSIGNMENT STATUS
// Investigator can update assignment progress
// PUT /api/assignments/:id/status
export const updateAssignmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Assigned",
      "Accepted",
      "In Progress",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid assignment status",
      });
    }

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Only the assigned investigator can update the assignment
    if (
      assignment.investigator.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this assignment",
      });
    }

    assignment.status = status;

    // Add completion date when completed
    if (status === "Completed") {
      assignment.completedAt = new Date();
    }

    const updatedAssignment = await assignment.save();

    // Keep incident status in sync
    const incident = await Incident.findById(assignment.incident);

    if (incident) {
      if (status === "Accepted") {
        incident.status = "Assigned";
      }

      if (status === "In Progress") {
        incident.status = "Under Investigation";
      }

      if (status === "Completed") {
        incident.status = "Resolved";
      }

      if (status === "Cancelled") {
        incident.status = "Pending";
      }

      await incident.save();
    }

    res.status(200).json({
      message: "Assignment status updated successfully",
      assignment: updatedAssignment,
    });
  } catch (error) {
    console.error("Error updating assignment status:", error);

    res.status(500).json({
      message: "Server error while updating assignment",
    });
  }
};

// DELETE / CANCEL ASSIGNMENT
// Admin cancels an assignment
// DELETE /api/assignments/:id
export const cancelAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    assignment.status = "Cancelled";

    await assignment.save();

    // Return incident to Pending
    const incident = await Incident.findById(assignment.incident);

    if (incident) {
      incident.status = "Pending";
      await incident.save();
    }

    res.status(200).json({
      message: "Assignment cancelled successfully",
      assignment,
    });
  } catch (error) {
    console.error("Error cancelling assignment:", error);

    res.status(500).json({
      message: "Server error while cancelling assignment",
    });
  }
};

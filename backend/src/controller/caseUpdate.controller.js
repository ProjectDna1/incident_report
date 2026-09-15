import CaseUpdate from "../models/CaseUpdate.js";
import Incident from "../models/Incident.js";
import Assignment from "../models/Assignment.js";


// CREATE CASE UPDATE
// POST /api/case-updates
export const createCaseUpdate = async (req, res) => {
  try {
    const {
      incidentId,
      assignmentId,
      updateType,
      text,
      publicView,
    } = req.body;

    // Incident is required
    if (!incidentId) {
      return res.status(400).json({
        message: "Incident is required",
      });
    }

    // Text is required
    if (!text?.trim()) {
      return res.status(400).json({
        message: "Case update text is required",
      });
    }

    // Check incident
    const incident = await Incident.findById(incidentId);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    // Check assignment if supplied
    let assignment = null;

    if (assignmentId) {
      assignment = await Assignment.findById(assignmentId);

      if (!assignment) {
        return res.status(404).json({
          message: "Assignment not found",
        });
      }
    }

    const caseUpdate = await CaseUpdate.create({
      incident: incidentId,
      assignment: assignmentId || null,
      updatedBy: req.user._id,
      updateType: updateType || "Investigation Update",
      text,
      publicView: publicView === true,
    });

    const populatedUpdate = await CaseUpdate.findById(caseUpdate._id)
      .populate("updatedBy", "fullName email role")
      .populate("assignment")
      .populate("incident");

    res.status(201).json({
      message: "Case update created successfully",
      update: populatedUpdate,
    });
  } catch (error) {
    console.error("Create case update error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET CASE UPDATES FOR AN INCIDENT
// GET /api/case-updates/incident/:incidentId
export const getIncidentUpdates = async (req, res) => {
  try {
    const { incidentId } = req.params;

    const updates = await CaseUpdate.find({
      incident: incidentId,
    })
      .populate("updatedBy", "fullName email role")
      .populate("assignment")
      .sort({ createdAt: -1 });

    res.status(200).json({
      updates,
    });
  } catch (error) {
    console.error("Get case updates error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
import Incident from "../models/Incident.js";


// CREATE INCIDENT
export const createIncident = async (req, res) => {
  try {
    const {
      title,
      description,
      incidentType,
      location,
      incidentDate,
      priority,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !incidentType ||
      !location?.address ||
      !incidentDate
    ) {
      return res.status(400).json({
        message: "Please provide all required incident information",
      });
    }

    // Create incident
    const incident = await Incident.create({
      reporter: req.user._id,
      title,
      description,
      incidentType,
      location: {
        address: location.address,
        latitude: location.latitude || null,
        longitude: location.longitude || null,
      },
      incidentDate,
      priority: priority || "Medium",
    });

    res.status(201).json({
      message: "Incident reported successfully",
      incident,
    });
  } catch (error) {
    console.error("Error creating incident:", error);

    res.status(500).json({
      message: "Server error while creating incident",
    });
  }
};

// GET MY INCIDENTS
export const getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({
      reporter: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      incidents,
    });
  } catch (error) {
    console.error("Error getting user incidents:", error);

    res.status(500).json({
      message: "Server error while getting incidents",
    });
  }
};

// GET ALL INCIDENTS
export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("reporter", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      incidents,
    });
  } catch (error) {
    console.error("Error getting all incidents:", error);

    res.status(500).json({
      message: "Server error while getting incidents",
    });
  }
};

// GET ONE INCIDENT
export const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id).populate(
      "reporter",
      "fullName email"
    );

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    res.status(200).json({
      incident,
    });
  } catch (error) {
    console.error("Error getting incident:", error);

    res.status(500).json({
      message: "Server error while getting incident",
    });
  }
};

// UPDATE INCIDENT
export const updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    // Only the person who created the incident
    // or an admin should be able to update it.
    const isOwner =
      incident.reporter.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You are not allowed to update this incident",
      });
    }

    const {
      title,
      description,
      incidentType,
      location,
      incidentDate,
      priority,
      status,
    } = req.body;

    // Update only fields that were provided
    if (title !== undefined) incident.title = title;
    if (description !== undefined) incident.description = description;
    if (incidentType !== undefined) incident.incidentType = incidentType;
    if (incidentDate !== undefined) incident.incidentDate = incidentDate;
    if (priority !== undefined) incident.priority = priority;

    if (location !== undefined) {
      incident.location = {
        address: location.address ?? incident.location.address,
        latitude: location.latitude ?? incident.location.latitude,
        longitude: location.longitude ?? incident.location.longitude,
      };
    }

    // Status should normally be changed by admin/investigator workflows.
    // For now, only admins can directly change it.
    if (status !== undefined && isAdmin) {
      incident.status = status;
    }

    const updatedIncident = await incident.save();

    res.status(200).json({
      message: "Incident updated successfully",
      incident: updatedIncident,
    });
  } catch (error) {
    console.error("Error updating incident:", error);

    res.status(500).json({
      message: "Server error while updating incident",
    });
  }
};

// DELETE INCIDENT
export const deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        message: "Incident not found",
      });
    }

    const isOwner =
      incident.reporter.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "You are not allowed to delete this incident",
      });
    }

    await Incident.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Incident deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting incident:", error);

    res.status(500).json({
      message: "Server error while deleting incident",
    });
  }
};
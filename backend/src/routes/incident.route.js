import express from "express";

import {
  createIncident,
  getMyIncidents,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
} from "../controller/incident.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE INCIDENT
// POST /api/incidents
router.post("/", protectRoute, createIncident);

// GET ALL INCIDENTS
// GET /api/incidents
router.get("/", protectRoute, getAllIncidents);

// GET MY INCIDENTS
// GET /api/incidents/my
router.get("/my", protectRoute, getMyIncidents);

// GET ONE INCIDENT
// GET /api/incidents/:id
router.get("/:id", protectRoute, getIncidentById);

// UPDATE INCIDENT
// PUT /api/incidents/:id
router.put("/:id", protectRoute, updateIncident);

// DELETE INCIDENT
// DELETE /api/incidents/:id
router.delete("/:id", protectRoute, deleteIncident);

export default router;

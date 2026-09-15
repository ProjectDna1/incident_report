import express from "express";

import {
  createCaseUpdate,
  getIncidentUpdates,
} from "../controller/caseUpdate.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();


// Create progress update
router.post(
  "/",
  protectRoute,
  createCaseUpdate
);


// Get progress updates for incident
router.get(
  "/incident/:incidentId",
  protectRoute,
  getIncidentUpdates
);


export default router;
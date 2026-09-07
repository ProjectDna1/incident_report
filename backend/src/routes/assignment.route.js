import express from "express";

import {
  createAssignment,
  getAllAssignments,
  getMyAssignments,
  getAssignmentById,
  updateAssignmentStatus,
  cancelAssignment,
} from "../controller/assignment.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE ASSIGNMENT
// Admin assigns an incident to an investigator
// POST /api/assignments
router.post("/", protectRoute, createAssignment);

// GET ALL ASSIGNMENTS
// Admin views all assignments
// GET /api/assignments
router.get("/", protectRoute, getAllAssignments);

// GET MY ASSIGNMENTS
// Investigator views assignments assigned to them
// GET /api/assignments/my
router.get("/my", protectRoute, getMyAssignments);

// GET ONE ASSIGNMENT
// GET /api/assignments/:id
router.get("/:id", protectRoute, getAssignmentById);

// UPDATE ASSIGNMENT STATUS
// Investigator updates assignment progress
// PUT /api/assignments/:id/status
router.put(
  "/:id/status",
  protectRoute,
  updateAssignmentStatus
);

// CANCEL ASSIGNMENT
// Admin cancels an assignment
// DELETE /api/assignments/:id
router.delete(
  "/:id",
  protectRoute,
  cancelAssignment
);

export default router;

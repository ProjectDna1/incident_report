import express from "express";
import { protectRoute, verifyRole } from "../middleware/auth.middleware.js";
import { deleteUser , getUsers,  getProfile } from "../controller/user.controller.js";
import { getInvestigators } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, verifyRole("admin"), getUsers);

router.delete("/:id", protectRoute, verifyRole("admin"), deleteUser);

router.get("/me", protectRoute, verifyRole("admin"), getProfile);

router.get("/investigators", protectRoute, verifyRole("admin"), getInvestigators);

export default router;
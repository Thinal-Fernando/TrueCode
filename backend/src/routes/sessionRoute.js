import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createSession } from "../controllers/sessionController.js";
import { getActiveSessions } from "../controllers/sessionController.js";
import { getMyRecentSessions } from "../controllers/sessionController.js";
import { getSessionById } from "../controllers/sessionController.js";
import { joinSession } from "../controllers/sessionController.js";
import { endSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);
router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSession);
router.post("/:id/end", protectRoute, endSession);

export default router;

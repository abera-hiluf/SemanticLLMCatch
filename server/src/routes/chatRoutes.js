import express from "express";
import chatController from "../controllers/chatController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { chatRequestSchema } from "../schemas/chatSchema.js";

const router = express.Router();

router.post("/", validateRequest(chatRequestSchema), chatController.chat);

export default router;

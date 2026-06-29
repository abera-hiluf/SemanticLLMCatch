import express from "express";
import chatController from "../controllers/chatController.js";
import { validate } from "../middleware/validateRequest.js";
import { chatSchema } from "../schemas/chatSchema.js";

const router = express.Router();

router.post(
    "/",
    validate(chatSchema),
    chatController.chat
);
export default router;
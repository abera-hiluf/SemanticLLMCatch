import express from "express";

import metricsController from "../controllers/metricsController.js";

const router = express.Router();

router.get("/", metricsController.getMetrics);

export default router;
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    await pool.query("SELECT NOW()");
    res.status(200).json({
      success: true,
      status: "UP",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

export default router;

import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // Format Zod Validation errors
  if (err instanceof ZodError || err.name === "ZodError") {
    statusCode = 400;
    message = "Validation Error";
    const issues = err.issues || err.errors || [];
    errors = issues.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
  }


  // Log error stack trace and context
  logger.error(
    {
      err: {
        message: err.message,
        stack: err.stack,
      },
      req: {
        method: req.method,
        url: req.url,
        query: req.query,
      },
    },
    "An error occurred during request processing"
  );

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}

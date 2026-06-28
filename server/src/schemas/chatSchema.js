import { z } from "zod";

export const chatRequestSchema = z.object({
  body: z.object({
    prompt: z.string({
      required_error: "Prompt is required",
    }).min(1, "Prompt cannot be empty"),
  }),
});

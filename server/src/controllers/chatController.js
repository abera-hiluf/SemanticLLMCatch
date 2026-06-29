import chatService from "../services/chatService.js";

async function chat(req, res, next) {
  try {
    const { prompt } = req.body;
    const result = await chatService.chat(prompt);

    return res.status(200).json({

      success: true,

      source: result.source,

      latency: result.latency,

      response: result.response

    });
  } catch (error) {
    next(error);
  }
}

export default {
  chat,
};

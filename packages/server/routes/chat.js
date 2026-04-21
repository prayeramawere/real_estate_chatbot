import express, { json } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { SYSTEM_PROMPT } from "../services/prompts.js";
import { useState } from "react";

dotenv.config();
const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const conversation = [];
router.post("/", async (req, res) => {
  const { user_input } = req.body;

  conversation.push({ role: "user", content: user_input });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...conversation],
    response_format: { type: "json_object" },
  });

  console.log(response.choices[0].message.content);

  const { message } = JSON.parse(response.choices[0].message.content);

  conversation.push({
    role: "assistant",
    content: message,
  });

  console.log(conversation);

  res.status(200).json({
    success: true,
    data: message,
    conversation: conversation,
  });
});

export default router;

import express, { json } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import { SYSTEM_PROMPT } from "../services/prompts.js";
import { addLead } from "../services/googlesheetsapi.js";

dotenv.config();
const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const conversation = [];
  const { user_input } = req.body;

  conversation.push({ role: "user", content: user_input });

  const tools = [
    {
      type: "function",
      function: {
        name: "save_lead",
        description: "Save a qualified lead into the CRM spreadsheet",

        parameters: {
          type: "object",

          properties: {
            name: {
              type: "string",
              description: "Lead full name",
            },

            email: {
              type: "string",
              format: "email",
              description: "Lead email address",
            },

            phone: {
              type: "string",
              description: "Lead phone number",
            },

            budget: {
              type: "string",
              description: "Estimated client budget",
            },

            service_description: {
              type: "string",
              description: "Summary of client needs",
            },
          },

          required: ["name", "service_description"],

          additionalProperties: false,
        },
      },
    },
  ];

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...conversation],
    tools: tools,
    tool_choice: "auto",
  });

  console.log(response.choices[0].message.content);

  const message = response.choices[0].message.content;
  const chatResponse = response.choices[0].message;

  if (chatResponse.tool_calls) {
    conversation.push(chatResponse);
    for (const toolCall of chatResponse.tool_calls) {
      const functionName = toolCall.function.name;
      const args = toolCall.function.arguments;

      const parsedData = JSON.parse(args);

      const value = Object.values(parsedData);
      console.log("value is : ", value);

      let result;

      if (functionName == "save_lead") {
        result = await addLead(value);
      }

      conversation.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(result),
      });
    }
    const secondResponse = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...conversation],
      tools: tools,
      tool_choice: "auto",
    });

    conversation.push({
      role: "assistant",
      content: secondResponse.choices[0].message.content,
    });
  } else {
    conversation.push({
      role: "assistant",
      content: message,
    });
  }

  console.log(conversation);

  res.status(200).json({
    success: true,
    data: message,
    conversation: conversation,
  });
});

export default router;

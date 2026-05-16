import express from "express";
import chat from "./routes/chat.js";
import { google } from "googleapis";
import cors from "cors";
import { auth } from "googleapis/build/src/apis/abusiveexperiencereport/index.js";
import { version } from "react";
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "https://real-estate-chatbot-2-4ke8.onrender.com/",
  }),
);

app.use("/api/chat", chat);

const spreadsheetId = "1W0ZLtpLNhFAfHJ87Bspk2vkmMrBrEC3YZ_GK0zwTM2c";

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});

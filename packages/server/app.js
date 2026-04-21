import express from "express";
import chat from "./routes/chat.js";
import cors from "cors";
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api/chat", chat);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});

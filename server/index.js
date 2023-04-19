import express from "express";
import openaiRouter from "./openai.js";
import cors from "cors";
const app = express();
const port = 3000 || process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/openai", openaiRouter);
app.get("/", (req, res) => {
  res.send("Initial page");
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use("/", (_, res) => res.send("home"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info("Server running on", PORT);
});

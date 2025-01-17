import express from "express";
import "dotenv/config";
import connectDB from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import mailRouter from "./mail.route.js";

const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", mailRouter);

const port = process.env.PORT;
if (!port) throw new Error("Port must be specified");

app.listen(3004, () => {
  connectDB();

  console.log("Server is running on port 3004");
});

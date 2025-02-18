import express from "express";
import "dotenv/config";
import connectDB from "./db.js";
// import path from "path";
// import { fileURLToPath } from "url";
import mailRouter from "./mail.route.js";

const app = express();
app.use(express.json());
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
  res.send("Welcome to Shortner URL");
});
app.use("/api", mailRouter);

const port = process.env.PORT;
if (!port) throw new Error("Port must be specified");

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port", port);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute.js";

dotenv.config();
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => 
  console.log("Connected to database!")
)

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use("/api/my.user, myUserRoute")

app.get("/test", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


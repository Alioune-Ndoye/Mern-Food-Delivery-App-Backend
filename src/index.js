import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import MyUserRoute from "./routes/MyUserRoute.js";
// Quick check to make sure env variables are loaded
console.log("Mongo URI:", process.env.MONGODB_CONNECTION_STRING);
console.log("Auth0 Audience:", process.env.AUTH0_AUDIENCE);
console.log("Auth0 Issuer:", process.env.AUTH0_ISSUER_BASE_URL);
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.error("DB Connection Error:", err));
const app = express();
const PORT = process.env.PORT || 7000;
// Middleware
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allows cookies to be sent
}));
app.use(express.json());
// Routes
app.use("/api/my/user", MyUserRoute);
// Test route
app.get("/test", (req, res) => {
    res.json({ message: "Hello World!" });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map
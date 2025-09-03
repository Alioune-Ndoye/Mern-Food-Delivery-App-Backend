import express from "express";
import MyUserController from "../controllers/MyUserCrontroller.js";
import { jwtCheck } from "../middleware/auth.js";
const router = express.Router();

router.post("/", jwtCheck, MyUserController.creatCurrentUser)

export default router;
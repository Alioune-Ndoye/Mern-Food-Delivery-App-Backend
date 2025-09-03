import express from "express";
import MyUserController from "../controllers/MyUserCrontroller.js";
const router = express.Router();

router.post("/", MyUserController.creatCurrentUser)

export default router;
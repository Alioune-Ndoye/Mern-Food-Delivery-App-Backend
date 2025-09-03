import express from "express";
import  MyUserContrloller  from "../controllers/MyUserCrontroller.js";
const router = express.Router();

router.get("/", MyUserContrloller.creatCurrentUser)

export default router;
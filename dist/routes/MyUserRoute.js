import express from "express";
import MyUserController from "../controllers/MyUserController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateMyUserRequest } from "../middleware/validation.js";
const router = express.Router();
// GET /api/my/user
router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);
// POST /api/my/user
router.post("/", jwtCheck, jwtParse, MyUserController.createCurrentUser);
// PUT /api/my/user
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);
export default router;
//# sourceMappingURL=MyUserRoute.js.map
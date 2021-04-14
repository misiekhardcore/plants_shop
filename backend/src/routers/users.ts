import express from "express";
import { extractJWT } from "../middlewares/extractJWT";
import {
  getUsers,
  login,
  register,
  validateToken,
} from "../controllers/users";

const router = express.Router();
router.get("/", extractJWT, getUsers);
router.post("/login", login);
router.post("/register", register);
router.get("/validate", extractJWT, validateToken);

export default router;

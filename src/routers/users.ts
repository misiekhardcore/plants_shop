import express from "express";
import { authUser } from "../middlewares/auth";
import {
  getUser,
  getUsers,
  login,
  register,
  validateToken,
} from "../controllers/users";

const router = express.Router();
router.get("/", authUser, getUsers);
router.get("/user/:id", authUser, getUser);
router.post("/login", login);
router.post("/register", register);
router.get("/validate", authUser, validateToken);

export default router;

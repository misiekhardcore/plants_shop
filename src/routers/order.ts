import express from "express";
import { authUser } from "../middlewares/auth";
import {
  createOrder,
  getOrder,
  getOrders,
} from "../controllers/orders";

const router = express.Router();
router.get("/", authUser, getOrders);
router.get("/:id", authUser, getOrder);
router.post("/", authUser, createOrder);

export default router;

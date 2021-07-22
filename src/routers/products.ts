import express from "express";
import { createRating } from "../controllers/rating";
import { authUser } from "../middlewares/auth";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/products";

const router = express.Router();

router.post("/", getAllProducts);
router.get("/:id", getOneProduct);
router.post("/create", createProduct);
router.post("/rate", authUser, createRating);
router.put("/", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

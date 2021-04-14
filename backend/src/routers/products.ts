import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
} from "../controllers/products";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;

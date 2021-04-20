import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct
} from "../controllers/products";

const router = express.Router();

router.post("/", getAllProducts);
router.get("/:id", getOneProduct);
router.post("/create", createProduct);
router.put("/", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

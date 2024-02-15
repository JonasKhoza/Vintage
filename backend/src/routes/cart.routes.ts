import express from "express";
import {
  addItemToCart,
  renderCart,
  updateCart,
} from "../controllers/cart.controllers";

const router = express.Router();
router.get("/items", renderCart);
router.post("/", addItemToCart);
router.patch("/", updateCart);

export default router;

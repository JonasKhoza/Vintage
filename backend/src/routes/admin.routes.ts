import express, { Request, Response } from "express";
const router = express.Router();

import verifyUserAuthentication from "../middlewares/verifyUserAuthentication";
import {
  addNewProduct,
  deleteProduct,
  fetchAllOrders,
  getAllProductsForAdmin,
  getProductToUpdate,
  updateOrder,
  updateProduct,
} from "../controllers/admin.controllers";

router.get("/all-products", verifyUserAuthentication, getAllProductsForAdmin);
router.post("/all-products/new", addNewProduct);
router.get("/all-products/:id", getProductToUpdate);
router.delete("/all-products/:id", deleteProduct);
router.patch("/all-products/:id", updateProduct);
router.get("/orders", fetchAllOrders);
router.patch("/orders/:orderId", updateOrder);

export default router;

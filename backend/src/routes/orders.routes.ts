import express from "express";
import {
  getSingleOrderHandler,
  getUserOrders,
  setOrderHandler,
} from "../controllers/orders.controllers";

const router = express.Router();

router.get("/", getUserOrders);
router.post("/", setOrderHandler);
router.get("/:orderId", getSingleOrderHandler);

export default router;

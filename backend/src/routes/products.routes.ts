import express from "express";
const router = express.Router();
import {
  addReviewToProduct,
  fetchAllProductsHandler,
  fetchOnSpeacialProductsHandler,
  fetchProductHandler,
  searchProductsHandler,
} from "../controllers/products.controllers";

router.get("/", fetchAllProductsHandler);
router.get("/search", searchProductsHandler);
router.get("/specials", fetchOnSpeacialProductsHandler);
router.get("/:productId", fetchProductHandler);
router.post("/review", addReviewToProduct);
export default router;

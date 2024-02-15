"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products_controllers_1 = require("../controllers/products.controllers");
router.get("/", products_controllers_1.fetchAllProductsHandler);
router.get("/search", products_controllers_1.searchProductsHandler);
router.get("/specials", products_controllers_1.fetchOnSpeacialProductsHandler);
router.get("/:productId", products_controllers_1.fetchProductHandler);
router.post("/review", products_controllers_1.addReviewToProduct);
exports.default = router;

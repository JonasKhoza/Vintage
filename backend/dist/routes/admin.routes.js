"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const verifyUserAuthentication_1 = __importDefault(require("../middlewares/verifyUserAuthentication"));
const admin_controllers_1 = require("../controllers/admin.controllers");
router.get("/all-products", verifyUserAuthentication_1.default, admin_controllers_1.getAllProductsForAdmin);
router.post("/all-products/new", admin_controllers_1.addNewProduct);
router.get("/all-products/:id", admin_controllers_1.getProductToUpdate);
router.delete("/all-products/:id", admin_controllers_1.deleteProduct);
router.patch("/all-products/:id", admin_controllers_1.updateProduct);
router.get("/orders", admin_controllers_1.fetchAllOrders);
router.patch("/orders/:orderId", admin_controllers_1.updateOrder);
exports.default = router;

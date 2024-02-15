"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controllers_1 = require("../controllers/orders.controllers");
const router = express_1.default.Router();
router.get("/", orders_controllers_1.getUserOrders);
router.post("/", orders_controllers_1.setOrderHandler);
router.get("/:orderId", orders_controllers_1.getSingleOrderHandler);
exports.default = router;

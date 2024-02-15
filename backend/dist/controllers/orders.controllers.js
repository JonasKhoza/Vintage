"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleOrderHandler = exports.setOrderHandler = exports.getUserOrders = void 0;
const cart_model_1 = require("../models/cart.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const order_model_1 = require("../models/order.model");
const address_model_1 = __importDefault(require("../models/address.model"));
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.uid;
    try {
        const existingAddressQuery = address_model_1.default.findOne({ _id: userId });
        const existingAddress = yield existingAddressQuery.exec();
        if (existingAddress !== null) {
            const orders = yield order_model_1.OrderClass.findAllOrdersForUser(userId);
            return res
                .status(200)
                .json({ orders: orders, userAddress: existingAddress });
        }
        else {
            return res
                .status(404)
                .json({ message: "User does not have an existing address." });
        }
    }
    catch (error) {
        console.error(error);
        return res.json({
            message: "Unfortunately, something went wrong in our server. We are working to fix that",
        });
    }
});
exports.getUserOrders = getUserOrders;
const setOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const cart = new cart_model_1.CartModel({
        items: ((_a = req.session.cart) === null || _a === void 0 ? void 0 : _a.items) || [],
        totalQuantity: ((_b = req.session.cart) === null || _b === void 0 ? void 0 : _b.totalQuantity) || 0,
        overallTotalPrice: ((_c = req.session.cart) === null || _c === void 0 ? void 0 : _c.overallTotalPrice) || 0,
    });
    let userSessionDocument;
    try {
        const userDocumentQuery = user_model_1.default.findById(req.session.uid);
        userSessionDocument = yield userDocumentQuery.exec();
        if (userSessionDocument !== null) {
            const order = new order_model_1.OrderClass(cart, userSessionDocument);
            yield order.saveOrder();
            req.session.cart = null;
            req.session.save(() => {
                return res.status(201).json({ message: "Order created" });
            });
        }
        else {
            return res
                .status(404)
                .json({ message: "Unfortunately, no user was found!" });
        }
    }
    catch (error) {
        console.error("Error saving order:", error);
        return res
            .status(500)
            .json({ message: "Unfortunately, something went wrong!" });
    }
});
exports.setOrderHandler = setOrderHandler;
const getSingleOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield order_model_1.OrderClass.findOrderById(orderId);
        res.status(200).json({ order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong whilst trying to fetch the order!",
        });
    }
});
exports.getSingleOrderHandler = getSingleOrderHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderClass = void 0;
const mongoose_1 = require("mongoose");
const cart_model_1 = require("./cart.model");
const mongodb_1 = require("mongodb");
const OrderSchema = new mongoose_1.Schema({
    cart: {
        type: cart_model_1.cartSchema,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "paid", "cancelled"],
        default: "pending",
    },
}, { timestamps: true });
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
class OrderClass {
    constructor(cart, user, status = "pending", orderId) {
        this.cart = cart;
        this.user = user;
        this.status = status;
        this.orderId = orderId;
    }
    //All orders for user
    static findAllOrdersForUser(userId) {
        const uid = new mongodb_1.ObjectId(userId);
        return Order.find({ user: uid })
            .sort({ _id: -1 })
            .populate("user", { password: 0 })
            .populate({
            path: "cart",
            populate: {
                path: "items.product",
                model: "Product",
            },
        });
    }
    //Single order
    static findOrderById(id) {
        const orderId = new mongodb_1.ObjectId(id);
        return Order.findById(orderId).populate({
            path: "cart",
            populate: {
                path: "items.product",
                model: "Product",
            },
        });
    }
    saveOrder() {
        if (this.orderId) {
            //Updating an already existing order by admin
            const orderId = new mongodb_1.ObjectId(this.orderId);
            return Order.updateOne({ _id: orderId }, { $set: { status: this.status } });
        }
        else {
            //Adding a new order
            const userObjectId = new mongodb_1.ObjectId(this.user._id);
            const orderDocument = {
                cart: this.cart,
                user: userObjectId,
                status: this.status,
            };
            return Order.create(orderDocument);
        }
    }
}
exports.OrderClass = OrderClass;

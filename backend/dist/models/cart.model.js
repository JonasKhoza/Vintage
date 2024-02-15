"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = exports.Cart = exports.CartModel = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    items: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
                default: [],
            },
            totalPrice: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
    overallTotalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
});
exports.cartSchema = cartSchema;
const CartModel = (0, mongoose_1.model)("Cart", cartSchema);
exports.CartModel = CartModel;
class Cart {
    constructor(items = [], totalQuantity = 0, overallTotalPrice = 0) {
        (this.items = items),
            (this.totalQuantity = totalQuantity),
            (this.overallTotalPrice = overallTotalPrice);
    }
    addItemToCart(product) {
        let cartItem = {
            product: product,
            totalPrice: +product.price,
            quantity: 1,
        };
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.product._id.toString() === product._id.toString()) {
                cartItem.totalPrice = +item.totalPrice + +product.price;
                cartItem.quantity = +item.quantity + 1;
                this.items[i] = cartItem;
                this.totalQuantity++;
                this.overallTotalPrice += +product.price;
                return;
            }
        }
        this.items.push(cartItem);
        this.totalQuantity++;
        this.overallTotalPrice += +product.price;
    }
    updateCartItem(productId, newQuantity) {
        const existingItem = this.items.find((item) => item.product._id.toString() === productId.toString());
        if (existingItem && newQuantity > 0) {
            const quantityChange = +newQuantity - existingItem.quantity;
            existingItem.quantity = +newQuantity;
            existingItem.totalPrice = +newQuantity * existingItem.product.price;
            this.totalQuantity += quantityChange;
            this.overallTotalPrice += quantityChange * existingItem.product.price;
        }
        else if (existingItem && newQuantity <= 0) {
            const itemIndex = this.items.findIndex((item) => item.product._id.toString() === productId.toString());
            this.totalQuantity -= existingItem.quantity;
            this.overallTotalPrice -= existingItem.totalPrice;
            this.items.splice(itemIndex, 1);
        }
    }
}
exports.Cart = Cart;

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
exports.updateCart = exports.addItemToCart = exports.renderCart = void 0;
const cart_model_1 = require("../models/cart.model");
const product_model_1 = __importDefault(require("../models/product.model"));
function renderCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let cartItems = { cartItem: req.session.cart };
        res.status(200).json(cartItems);
    });
}
exports.renderCart = renderCart;
function addItemToCart(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.body.productId;
        try {
            const product = yield product_model_1.default.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            const cart = new cart_model_1.Cart((_a = req.session.cart) === null || _a === void 0 ? void 0 : _a.items, (_b = req.session.cart) === null || _b === void 0 ? void 0 : _b.totalQuantity, (_c = req.session.cart) === null || _c === void 0 ? void 0 : _c.overallTotalPrice);
            yield cart.addItemToCart(product);
            //Updating the session with the newly added cart
            req.session.cart = cart;
            req.session.save(() => {
                res.status(200).json({ prodAdded: true });
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error!" });
        }
    });
}
exports.addItemToCart = addItemToCart;
function updateCart(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const { productId, newQuantity } = req.body;
        const cart = new cart_model_1.Cart((_a = req.session.cart) === null || _a === void 0 ? void 0 : _a.items, (_b = req.session.cart) === null || _b === void 0 ? void 0 : _b.totalQuantity, (_c = req.session.cart) === null || _c === void 0 ? void 0 : _c.overallTotalPrice);
        cart.updateCartItem(productId, newQuantity);
        req.session.cart = cart;
        console.log(cart);
        req.session.save(() => {
            res.status(200).json({ updated: true });
        });
    });
}
exports.updateCart = updateCart;

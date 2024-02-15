"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_model_1 = require("../models/cart.model");
const initializeCartMiddleware = (req, res, next) => {
    let cart;
    try {
        if (req.session.cart && Object.keys(req.session.cart).length > 0) {
            //Populates the cart with existing cart data
            cart = new cart_model_1.Cart(req.session.cart.items, req.session.cart.totalQuantity, req.session.cart.overallTotalPrice);
        }
        else {
            //Initializes an empty cart.
            cart = new cart_model_1.Cart();
        }
        //Updates the session
        req.session.cart = cart;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = initializeCartMiddleware;

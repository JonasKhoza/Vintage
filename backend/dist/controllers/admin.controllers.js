"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.fetchAllOrders = exports.updateOrder = exports.updateProduct = exports.getProductToUpdate = exports.deleteProduct = exports.addNewProduct = exports.getAllProductsForAdmin = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const order_model_1 = __importStar(require("../models/order.model"));
const address_model_1 = __importDefault(require("../models/address.model"));
function getAllProductsForAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = req.userData;
        if (!(userData === null || userData === void 0 ? void 0 : userData.user.isAdmin)) {
            return res.status(400).json({
                message: "Unfortunately you are not authorized to visit this route.",
            });
        }
        try {
            const products = yield product_model_1.default.find().sort({ id: -1 });
            console.log(products);
            return res.status(201).json({ products });
        }
        catch (err) {
            return res.status(500).json({
                message: "Something went wrong whilst fetching products for admin.",
                err,
            });
        }
    });
}
exports.getAllProductsForAdmin = getAllProductsForAdmin;
function addNewProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, image, summary, price, oldPrice, description, color, quantity, special, brand, } = req.body;
        const newProduct = {
            title,
            image,
            summary,
            price,
            oldPrice,
            description,
            color: color,
            quantity,
            special,
            brand,
            reviews: [],
        };
        try {
            const product = new product_model_1.default(newProduct);
            const createdProduct = yield product.save();
            res
                .status(201)
                .json({ message: "Successfully created the product", createdProduct });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Something went wrong whilst creating the product!",
            });
        }
    });
}
exports.addNewProduct = addNewProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.id;
        try {
            const deletedProduct = yield product_model_1.default.findByIdAndDelete(productId);
            res
                .status(200)
                .json({ success: "Successfully deleted the product!", deletedProduct });
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong whilst deleting te product.",
                error,
            });
        }
    });
}
exports.deleteProduct = deleteProduct;
function getProductToUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.id;
        try {
            const productToUpdateQuery = product_model_1.default.findById(productId);
            const productToUpdate = yield productToUpdateQuery.exec();
            if (productToUpdate !== null) {
                return res
                    .status(200)
                    .json({ product: productToUpdate, foundProduct: true });
            }
            else {
                res
                    .status(404)
                    .json({ message: "No product was found.", foundProduct: false });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: "Something went wrong whilst finding the product to update.",
                foundProduct: false,
            });
        }
    });
}
exports.getProductToUpdate = getProductToUpdate;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, image, summary, price, oldPrice, description, color, quantity, special, brand, } = req.body;
        const productId = req.params.id;
        try {
            const updatedProduct = yield product_model_1.default.findByIdAndUpdate(productId, {
                $set: {
                    title,
                    image,
                    summary,
                    price,
                    oldPrice,
                    description,
                    color,
                    quantity,
                    special,
                    brand,
                },
            });
            res
                .status(200)
                .json({ success: "Product uccesfully updated.", updatedProduct });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Something went wrong whilst updating the product.",
                err,
            });
        }
    });
}
exports.updateProduct = updateProduct;
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newStatus = req.body.newStatus;
        const orderId = req.params.orderId;
        const order = new order_model_1.OrderClass(null, null, newStatus, orderId);
        try {
            const savedOrder = yield order.saveOrder();
            res
                .status(200)
                .json({ message: "Order successfully updated!", savedOrder });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Unfortunately, something went wrong in our server whilst saving the order.",
            });
        }
    });
}
exports.updateOrder = updateOrder;
function fetchAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.default.find()
                .sort({ _id: -1 })
                .populate("user", { password: 0 })
                .populate({
                path: "cart",
                populate: {
                    path: "items.product",
                    model: "Product",
                },
            });
            let existingAddress;
            const addresses = [];
            yield Promise.all(orders.map((order) => __awaiter(this, void 0, void 0, function* () {
                const existingAddressQuery = address_model_1.default.findOne({
                    _id: order.user._id,
                }).sort({ _id: -1 });
                existingAddress = yield existingAddressQuery.exec();
                if (existingAddress) {
                    const addressExists = addresses.some((address) => address._id.toString() === existingAddress._id.toString());
                    if (!addressExists) {
                        addresses.push(existingAddress);
                    }
                }
                return existingAddress ? [existingAddress] : []; // Return an array with existingAddress or an empty array
            })));
            return res.status(200).json({ orders: orders, usersAddresses: addresses });
        }
        catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ message: "Something went wrong whilst fetching orders." });
        }
    });
}
exports.fetchAllOrders = fetchAllOrders;

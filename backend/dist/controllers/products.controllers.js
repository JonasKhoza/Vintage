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
exports.fetchOnSpeacialProductsHandler = exports.searchProductsHandler = exports.fetchAllProductsHandler = exports.addReviewToProduct = exports.fetchProductHandler = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const fetchAllProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.currentPage) || 1;
    const pageSize = 8;
    // Calculate the skip value based on the current page and page size
    const skip = (page - 1) * pageSize;
    try {
        // Query the database to fetch the products for the current page
        const products = yield product_model_1.default.find()
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(pageSize);
        // Count the total number of products
        const totalProducts = yield product_model_1.default.countDocuments();
        res.status(200).json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / pageSize),
            totalProducts: totalProducts,
            message: "yes",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "An error occured while fetching products.",
        });
    }
});
exports.fetchAllProductsHandler = fetchAllProductsHandler;
const fetchProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const productQuery = product_model_1.default.findById(productId);
        const product = yield productQuery.exec();
        if (product !== null) {
            return res.status(200).json({ product });
        }
        else {
            res.status(404).json({ message: "Product was not found!" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Unfortunately something went wrong whilst fetching the product!",
        });
    }
});
exports.fetchProductHandler = fetchProductHandler;
const addReviewToProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, uid, createdAt, rating, comment, username } = req.body;
    const userId = req.query;
    console.log(req.body);
    if (productId.trim() === "" ||
        String(createdAt).trim() === "" ||
        rating.trim() === "" ||
        comment.trim() === "") {
        return res
            .status(400)
            .json({ message: "Please insert all the relevant data" });
    }
    if (uid.trim() === "" || username.trim() === "") {
        return res
            .status(401)
            .json({ message: "Please login to create a review." });
    }
    const review = {
        username,
        rating,
        comment,
        uid,
        createdAt,
    };
    try {
        //Checking to see if product exist
        const productQuery = product_model_1.default.findById(productId);
        const product = yield productQuery.exec();
        if (product !== null) {
            //Checking if user has an existing review
            const reviewedProductQuery = product_model_1.default.findOne({ "reviews.uid": uid });
            const reviewedProduct = yield reviewedProductQuery.exec();
            if (reviewedProduct !== null) {
                return res
                    .status(400)
                    .json({ message: "You have already reviewed the product!" });
            }
            //Adding a review
            const updatedProduct = yield product_model_1.default.findOneAndUpdate({ _id: productId }, { $push: { reviews: review } }, { new: true });
            return res
                .status(200)
                .json({ message: "Review added successfully!", updatedProduct });
        }
        else {
            return res.status(404).json({ message: "Product not found!" });
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Something went wrong whilst trying to save review" });
    }
});
exports.addReviewToProduct = addReviewToProduct;
const searchProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query: searchString, page } = req.query;
    const currentPage = Number(page) || 1;
    const pageSize = 8;
    const skip = (currentPage - 1) * pageSize;
    try {
        const searchedProducts = yield product_model_1.default.find({
            $text: { $search: `"${searchString}"` },
        }, { score: { $meta: "textScore" } })
            .collation({ locale: "en", strength: 2 })
            .sort({ score: { $meta: "textScore" } })
            .skip(skip)
            .limit(pageSize)
            .exec();
        const searchedProductsCount = yield product_model_1.default.countDocuments({
            $text: { $search: `"${searchString}"` },
        });
        return res.status(200).json({
            products: searchedProducts,
            totalProducts: searchedProductsCount,
            totalPages: Math.ceil(searchedProductsCount / pageSize),
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong whilst trying to search for the products!",
        });
    }
});
exports.searchProductsHandler = searchProductsHandler;
const fetchOnSpeacialProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const currentPage = Number(page) || 1;
    const pageSize = 8;
    const skip = (currentPage - 1) * pageSize;
    try {
        const products = yield product_model_1.default.find({ special: true })
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(pageSize);
        const totalProducts = yield product_model_1.default.countDocuments({ special: true });
        const totalPages = Math.ceil(totalProducts / pageSize);
        return res.status(200).json({ products, totalProducts, totalPages });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong whilst trying to fetch products.",
        });
    }
});
exports.fetchOnSpeacialProductsHandler = fetchOnSpeacialProductsHandler;

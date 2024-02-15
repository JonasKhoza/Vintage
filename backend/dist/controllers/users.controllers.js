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
exports.updateUserAddressHandler = exports.updateUserInfo = exports.setUserAddressHandler = exports.logoutHandler = exports.checkUserCookieStatus = exports.getUserProfileHandler = exports.getUserLoginHandler = exports.getUserSignupHandler = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//My files imports
const user_model_1 = __importDefault(require("../models/user.model"));
const generateJWTToken_1 = __importDefault(require("../utils/generateJWTToken"));
const address_model_1 = __importDefault(require("../models/address.model"));
function getUserSignupHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstname, lastname, email, password } = req.body;
        try {
            // CHECK IF THE USER EXIST
            //first create a query object existingUserQuery using User.findOne({ email })
            //execute the query by calling exec() on the query object, which returns a promise.
            //result will be the user object if found or null if not found
            const existingUserQuery = user_model_1.default.findOne({ email });
            const existingUser = yield existingUserQuery.exec();
            if (existingUser !== null) {
                // User already exists
                return res.status(409).json({
                    statusCode: 409,
                    message: "User already exists.Please login.",
                });
            }
            const saltRounds = 3;
            const hashedPassword = bcryptjs_1.default.hashSync(password, saltRounds);
            const user = new user_model_1.default({
                firstname,
                lastname,
                email,
                password: hashedPassword,
            });
            const savedUser = yield user.save();
            res.status(201).json({
                statusCode: 201,
                message: "User is succesfully created.",
                user: savedUser,
            });
        }
        catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: "An error occurred while saving the user.",
            });
        }
    });
}
exports.getUserSignupHandler = getUserSignupHandler;
//LOGIN HANDLER
function getUserLoginHandler(req, res) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
        if (accessToken || refreshToken) {
            return res
                .status(400)
                .json({ statusCode: 400, message: "You are already logged in." });
        }
        try {
            const existingUserQuery = user_model_1.default.findOne({ email });
            const existingUser = yield existingUserQuery.exec();
            if (existingUser === null) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "User is not found! Please enter a correct email or create an account.",
                });
            }
            const passwordMatched = bcryptjs_1.default.compareSync(password, existingUser.password);
            if (!passwordMatched) {
                return res
                    .status(400)
                    .json({ statusCode: 400, message: "Passwords do not match." });
            }
            const userData = {
                userId: existingUser._id,
                name: existingUser.firstname,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
                createdAt: existingUser.createdAt,
            };
            const { accessToken, refreshToken } = (0, generateJWTToken_1.default)(userData);
            res.cookie("accessToken", accessToken, {
                expires: new Date(Date.now() + 3600000),
                path: "/",
                sameSite: "lax",
                secure: false,
                httpOnly: true,
            });
            res.cookie("refreshToken", refreshToken, {
                expires: new Date(Date.now() + 1 * 24 * 3600000),
                path: "/",
                sameSite: "lax",
                secure: false,
                httpOnly: true,
            });
            //Associating the user logging in with the session given upon visiting the site
            req.session.uid = existingUser._id;
            res.status(200).json({
                statusCode: 200,
                message: "User is logged in.",
                userData,
                token: accessToken,
                refreshToken,
            });
        }
        catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: "An error has occured on the server while logging in the user.",
            });
        }
    });
}
exports.getUserLoginHandler = getUserLoginHandler;
const checkUserCookieStatus = (req, res) => {
    var _a, _b;
    const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
    if (!accessToken && !refreshToken) {
        return res.json({ accessToken: false, message: "Does not have a cookie." });
    }
    try {
        if (accessToken)
            jsonwebtoken_1.default.verify(accessToken, process.env.JWT_AUTHENTICATION_KEY);
        if (refreshToken)
            jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_AUTHENTICATION_KEY);
    }
    catch (error) {
        return res.json({ hasCookie: false, message: "Invalid token." });
    }
    return res.json({ hasCookie: true, message: "Valid token." });
};
exports.checkUserCookieStatus = checkUserCookieStatus;
const getUserProfileHandler = (req, res) => { };
exports.getUserProfileHandler = getUserProfileHandler;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, existingPassword, password, userId } = req.body;
    console.log("User info: ", req.body);
    try {
        const existingUserQuery = user_model_1.default.findById({ _id: userId });
        const existingUser = yield existingUserQuery.exec();
        if (existingUser === null) {
            return res.status(404).json({ message: "User does not exist!" });
        }
        else {
            const passwordMatched = yield bcryptjs_1.default.compare(existingPassword, existingUser.password);
            if (!passwordMatched) {
                return res
                    .status(400)
                    .json({ statusCode: 400, message: "Passwords do not match." });
            }
            else {
                yield user_model_1.default.updateOne({ _id: userId }, { $set: { firstname: username, email, password } });
                res.status(201).json({ message: "User is successfully updated!" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong in the server." });
    }
});
exports.updateUserInfo = updateUserInfo;
const logoutHandler = (req, res) => {
    try {
        // Delete the cookie by setting an expired date
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message: "Logged out successfully." });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred during logout." });
    }
};
exports.logoutHandler = logoutHandler;
function setUserAddressHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { address, userId } = req.body;
            if (!address.street.trim() ||
                !address.city.trim() ||
                !address.postalCode.trim()) {
                return res.status(400).json({
                    error: "Please provide all the necessary values.",
                });
            }
            if (!userId) {
                return res.status(400).json({
                    error: "Please login first.",
                });
            }
            // Find the existing user
            const existingUser = yield user_model_1.default.findOne({ _id: userId });
            if (!existingUser) {
                return res.status(404).json({ error: "User not found" });
            }
            //Check if user have existing address
            const existingAddressQuery = address_model_1.default.findOne({ _id: userId });
            const existingAddress = yield existingAddressQuery.exec();
            if (existingAddress !== null) {
                //Updating address
                yield address_model_1.default.updateOne({ _id: userId }, {
                    $set: {
                        street: address.street,
                        city: address.city,
                        postalCode: address.postalCode,
                    },
                });
                res.status(201).json({ message: "Address saved successfully" });
            }
            else {
                // Create a new address document
                const newAddress = new address_model_1.default({
                    _id: existingUser._id,
                    street: address.street,
                    city: address.city,
                    postalCode: address.postalCode,
                });
                // Save the address to the database
                yield newAddress.save();
                res.status(201).json({ message: "Address saved successfully" });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
        }
    });
}
exports.setUserAddressHandler = setUserAddressHandler;
const updateUserAddressHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { street, city, postalCode, userId } = req.body;
    console.log("User address: ", req.body);
    try {
        if (!street.trim() || !city.trim() || !postalCode.trim()) {
            return res.status(400).json({
                error: "Please provide all the necessary values.",
            });
        }
        if (!userId) {
            return res.status(400).json({
                error: "Please login first.",
            });
        }
        // Find the existing user
        const existingUser = yield user_model_1.default.findOne({ _id: userId });
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
        //Check if user have existing address
        const existingAddressQuery = address_model_1.default.findOne({ _id: userId });
        const existingAddress = yield existingAddressQuery.exec();
        if (existingAddress !== null) {
            //Updating address
            yield address_model_1.default.updateOne({ _id: userId }, {
                $set: {
                    street: street,
                    city: city,
                    postalCode: postalCode,
                },
            });
            res.status(201).json({ message: "Address saved successfully" });
        }
        else {
            // Create a new address document
            const newAddress = new address_model_1.default({
                _id: existingUser._id,
                street: street,
                city: city,
                postalCode: postalCode,
            });
            // Save the address to the database
            yield newAddress.save();
            res.status(201).json({ message: "Address created successfully" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});
exports.updateUserAddressHandler = updateUserAddressHandler;

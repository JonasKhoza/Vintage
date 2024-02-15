"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyUserAuthentication(req, res, next) {
    var _a, _b;
    const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    const refreshToken = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refreshToken;
    if (!accessToken && !refreshToken) {
        return res
            .status(401)
            .json({ statusCode: 401, message: "Unauthorized user! Please login." });
    }
    try {
        let decodedToken;
        if (accessToken)
            jsonwebtoken_1.default.verify(accessToken, process.env.JWT_AUTHENTICATION_KEY);
        if (refreshToken)
            decodedToken = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_AUTHENTICATION_KEY);
        req.userData = decodedToken;
        next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ statusCode: 401, message: "Invalid access token." });
    }
}
exports.default = verifyUserAuthentication;

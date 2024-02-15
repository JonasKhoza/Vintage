"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWTToken(user) {
    const accessToken = jsonwebtoken_1.default.sign(user, `${process.env.JWT_AUTHENTICATION_KEY}`, {
        expiresIn: `${process.env.EXPIRES_IN_1}`,
    });
    const refreshToken = jsonwebtoken_1.default.sign({ user }, `${process.env.JWT_AUTHENTICATION_KEY}`, { expiresIn: "1d" });
    return { accessToken, refreshToken };
}
exports.default = generateJWTToken;

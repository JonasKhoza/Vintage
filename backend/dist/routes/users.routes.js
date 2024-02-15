"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controllers_1 = require("../controllers/users.controllers");
const verifyUserAuthentication_1 = __importDefault(require("../middlewares/verifyUserAuthentication"));
const router = express_1.default.Router();
router.post("/signup", users_controllers_1.getUserSignupHandler);
router.post("/login", users_controllers_1.getUserLoginHandler);
router.get("/profile", verifyUserAuthentication_1.default, users_controllers_1.getUserProfileHandler);
router.get("/auth", users_controllers_1.checkUserCookieStatus);
router.delete("/logout", users_controllers_1.logoutHandler);
//Shipping address
router.post("/shipping", users_controllers_1.setUserAddressHandler);
router.put("/update-address", users_controllers_1.updateUserAddressHandler);
router.put("/update-info", users_controllers_1.updateUserInfo);
exports.default = router;

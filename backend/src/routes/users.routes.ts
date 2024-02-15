import express from "express";

import {
  checkUserCookieStatus,
  getUserLoginHandler,
  getUserProfileHandler,
  getUserSignupHandler,
  logoutHandler,
  setUserAddressHandler,
  updateUserAddressHandler,
  updateUserInfo,
} from "../controllers/users.controllers";
import verifyUserAuthentication from "../middlewares/verifyUserAuthentication";

const router = express.Router();

router.post("/signup", getUserSignupHandler);
router.post("/login", getUserLoginHandler);
router.get("/profile", verifyUserAuthentication, getUserProfileHandler);
router.get("/auth", checkUserCookieStatus);
router.delete("/logout", logoutHandler);
//Shipping address
router.post("/shipping", setUserAddressHandler);
router.put("/update-address", updateUserAddressHandler);
router.put("/update-info", updateUserInfo);

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    if (req.cookies && req.cookies.hasOwnProperty("accessToken1")) {
        const accessToken = req.cookies.accessToken1;
        console.log(accessToken);
    }
    // console.log(req.cookies);
    // console.log(cookies);
    // console.log(cookies.accessToken1)
    // let cookiesArr = cookies && cookies.split(";");
    //   let tokenCookie;
    //   if (cookies && cookie.length > 0) {
    //     for (selectedCookie of cookie) {
    //       if (selectedCookie.includes("token")) {
    //         tokenCookie = selectedCookie;
    //       }
    //     }
    //   }
    //   let token;
    //   let decoded;
    //   try {
    //     if (tokenCookie) {
    //       token = tokenCookie.split("=")[1];
    //       decoded = jwt.verify(token, process.env.AUTHENTICATION_KEY);
    //       req.user = decoded;
    //     } else {
    //       return res.json({ message: "Unauthorized user! Please login" });
    //     }
    //   } catch (error) {
    //     res.status(401).json("   Unauthorized! Please login");
    //     next(error);
    //   }
    next();
}
exports.default = verifyToken;
module.exports = verifyToken;

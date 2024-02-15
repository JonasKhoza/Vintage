"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfigHandler = exports.sessionStore = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
exports.sessionStore = new MongoDBStore({
    uri: `mongodb+srv://jonaskhoza18:MJSJ2Q6ldLDGImm7@cluster3.0ai6z9x.mongodb.net/onestore`,
    databaseName: "onestore",
    collection: "sessions",
});
exports.sessionStore.on("error", (error) => {
    console.log("MongoDB session store error:", error);
});
const sessionConfigHandler = (store) => {
    return {
        secret: process.env.SESSION_SECRET_KEY || "my-secret-key", // Replace 'your-secret-key' with your actual secret key
        resave: false, //prevents resaving of unchanged sessions
        saveUninitialized: false, //ensures saving only when there's some data change in it
        store: store, //where the session data is actually stored
        cookie: {
            sameSite: true, //This helps prevent CSRF attacks but best used in production mode not necessary for development mode
            SameSite: "Lax",
            Path: "/", //paths that this cookie will be available at
            httpOnly: true, //cookie cannot be accessed from the browser console
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            secure: false,
        },
    };
};
exports.sessionConfigHandler = sessionConfigHandler;

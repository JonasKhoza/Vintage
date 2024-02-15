"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Third party packages
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
//My files imports
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const base_routes_1 = __importDefault(require("./routes/base.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const orders_routes_1 = __importDefault(require("./routes/orders.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const config_1 = __importDefault(require("./utils/config"));
const session_1 = require("./utils/session");
const initializeCartMiddleware_1 = __importDefault(require("./middlewares/initializeCartMiddleware"));
const app = (0, express_1.default)();
//Cors solution
// app.use(
//   (req, res, next) => {
//     next();
//   },
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//   })
// );
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Replace with the origin of your frontend application
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"], // Specify the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
}));
app.use((0, cookie_parser_1.default)()); //allows to easily parse and manipulate HTTP cookies in your Express application.
app.disable("x-powered-by"); //this makes it more difficult for users to see that I am using Express
express_1.default.urlencoded({
    extended: true,
}); /*to parse the URL-encoded form data sent in the request.
When extended is set to true, the values can be of any type,
allowing for complex objects and arrays to be encoded in the URL-encoded format*/
app.use(express_1.default.json()); //to parse incoming requests with JSON payloads.
app.use((0, express_session_1.default)((0, session_1.sessionConfigHandler)(session_1.sessionStore)));
// Initialize cart on user's first visit
app.use(initializeCartMiddleware_1.default);
//routes registration
app.use(base_routes_1.default);
app.use("/users", users_routes_1.default);
app.use("/cart", cart_routes_1.default);
app.use("/orders", orders_routes_1.default);
app.use("/products", products_routes_1.default);
app.use("/admin", admin_routes_1.default);
app.listen(config_1.default.port, () => {
    console.log("Connection established on port 8000");
});

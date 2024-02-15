import express from "express";
//Third party packages
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

//My files imports
import userRoutes from "./routes/users.routes";
import baseRoutes from "./routes/base.routes";
import cartRoutes from "./routes/cart.routes";
import ordersRoutes from "./routes/orders.routes";
import productsRoutes from "./routes/products.routes";
import adminRoutes from "./routes/admin.routes";

import config from "./utils/config";
import { sessionConfigHandler, sessionStore } from "./utils/session";
import initializeCartMiddleware from "./middlewares/initializeCartMiddleware";

const app = express();

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

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the origin of your frontend application
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"], // Specify the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
  })
);

app.use(cookieParser()); //allows to easily parse and manipulate HTTP cookies in your Express application.
app.disable("x-powered-by"); //this makes it more difficult for users to see that I am using Express
express.urlencoded({
  extended: true,
}); /*to parse the URL-encoded form data sent in the request.
When extended is set to true, the values can be of any type, 
allowing for complex objects and arrays to be encoded in the URL-encoded format*/
app.use(express.json()); //to parse incoming requests with JSON payloads.

app.use(session(sessionConfigHandler(sessionStore)));

// Initialize cart on user's first visit
app.use(initializeCartMiddleware);

//routes registration
app.use(baseRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use("/products", productsRoutes);
app.use("/admin", adminRoutes);

app.listen(config.port, () => {
  console.log("Connection established on port 8000");
});

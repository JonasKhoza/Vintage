import { NextFunction, Request, Response } from "express";
import { Cart } from "../models/cart.model";
const initializeCartMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let cart;
  try {
    if (req.session.cart! && Object.keys(req.session.cart!).length > 0) {
      //Populates the cart with existing cart data
      cart = new Cart(
        req.session.cart!.items,
        req.session.cart!.totalQuantity,
        req.session.cart!.overallTotalPrice
      );
    } else {
      //Initializes an empty cart.
      cart = new Cart();
    }

    //Updates the session
    req.session.cart = cart;
    next();
  } catch (err) {
    next(err);
  }
};

export default initializeCartMiddleware;

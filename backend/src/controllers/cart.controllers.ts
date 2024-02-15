import { Request, Response } from "express";
import { Cart } from "../models/cart.model";
import ProductModel from "../models/product.model";

async function renderCart(req: Request, res: Response) {
  let cartItems = { cartItem: req.session.cart };
  res.status(200).json(cartItems);
}

async function addItemToCart(req: Request, res: Response) {
  const productId = req.body.productId;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = new Cart(
      req.session.cart?.items,
      req.session.cart?.totalQuantity,
      req.session.cart?.overallTotalPrice
    );

    await cart.addItemToCart(product);

    //Updating the session with the newly added cart
    req.session.cart = cart;

    req.session.save(() => {
      res.status(200).json({ prodAdded: true });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

async function updateCart(req: Request, res: Response) {
  const { productId, newQuantity } = req.body;
  const cart = new Cart(
    req.session.cart?.items,
    req.session.cart?.totalQuantity,
    req.session.cart?.overallTotalPrice
  );

  cart.updateCartItem(productId, newQuantity);

  req.session.cart = cart;
  console.log(cart);
  req.session.save(() => {
    res.status(200).json({ updated: true });
  });
}

export { renderCart, addItemToCart, updateCart };

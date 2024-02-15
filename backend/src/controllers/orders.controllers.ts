import { Request, Response } from "express";
import { CartModel } from "../models/cart.model";
import User from "../models/user.model";
import { OrderClass } from "../models/order.model";
import Address from "../models/address.model";

const getUserOrders = async (req: Request, res: Response) => {
  const userId = req.session.uid!;

  try {
    const existingAddressQuery = Address.findOne({ _id: userId });
    const existingAddress = await existingAddressQuery.exec();

    if (existingAddress !== null) {
      const orders = await OrderClass.findAllOrdersForUser(userId);
      return res
        .status(200)
        .json({ orders: orders, userAddress: existingAddress });
    } else {
      return res
        .status(404)
        .json({ message: "User does not have an existing address." });
    }
  } catch (error) {
    console.error(error);
    return res.json({
      message:
        "Unfortunately, something went wrong in our server. We are working to fix that",
    });
  }
};

const setOrderHandler = async (req: Request, res: Response) => {
  const cart = new CartModel({
    items: req.session.cart?.items || [],
    totalQuantity: req.session.cart?.totalQuantity || 0,
    overallTotalPrice: req.session.cart?.overallTotalPrice || 0,
  });

  let userSessionDocument;

  try {
    const userDocumentQuery = User.findById(req.session.uid);
    userSessionDocument = await userDocumentQuery.exec();

    if (userSessionDocument !== null) {
      const order = new OrderClass(cart, userSessionDocument);

      await order.saveOrder();

      req.session.cart = null;

      req.session.save(() => {
        return res.status(201).json({ message: "Order created" });
      });
    } else {
      return res
        .status(404)
        .json({ message: "Unfortunately, no user was found!" });
    }
  } catch (error) {
    console.error("Error saving order:", error);
    return res
      .status(500)
      .json({ message: "Unfortunately, something went wrong!" });
  }
};

const getSingleOrderHandler = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await OrderClass.findOrderById(orderId);
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong whilst trying to fetch the order!",
    });
  }
};

export { getUserOrders, setOrderHandler, getSingleOrderHandler };

import { Request, Response } from "express";
import Product from "../models/product.model";
import Order, { OrderClass } from "../models/order.model";
import { JwtPayload } from "jsonwebtoken";
import Address from "../models/address.model";
import { Document, ObjectId } from "mongoose";

interface CustomRequest extends Request {
  userData?: JwtPayload;
}

async function getAllProductsForAdmin(req: CustomRequest, res: Response) {
  const userData = req.userData;

  if (!userData?.user.isAdmin) {
    return res.status(400).json({
      message: "Unfortunately you are not authorized to visit this route.",
    });
  }

  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(201).json({ products });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong whilst fetching products for admin.",
      err,
    });
  }
}

async function addNewProduct(req: Request, res: Response) {
  const {
    title,
    image,
    summary,
    price,
    oldPrice,
    description,
    color,
    quantity,
    special,
    brand,
  } = req.body;

  const newProduct = {
    title,
    image,
    summary,
    price,
    oldPrice,
    description,
    color: color,
    quantity,
    special,
    brand,
    reviews: [],
  };

  try {
    const product = new Product(newProduct);
    const createdProduct = await product.save();
    res
      .status(201)
      .json({ message: "Successfully created the product", createdProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong whilst creating the product!",
    });
  }
}

async function deleteProduct(req: Request, res: Response) {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    res
      .status(200)
      .json({ success: "Successfully deleted the product!", deletedProduct });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong whilst deleting te product.",
      error,
    });
  }
}

async function getProductToUpdate(req: Request, res: Response) {
  const productId = req.params.id;

  try {
    const productToUpdateQuery = Product.findById(productId);
    const productToUpdate = await productToUpdateQuery.exec();

    if (productToUpdate !== null) {
      return res
        .status(200)
        .json({ product: productToUpdate, foundProduct: true });
    } else {
      res
        .status(404)
        .json({ message: "No product was found.", foundProduct: false });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong whilst finding the product to update.",
      foundProduct: false,
    });
  }
}

async function updateProduct(req: Request, res: Response) {
  const {
    title,
    image,
    summary,
    price,
    oldPrice,
    description,
    color,
    quantity,
    special,
    brand,
  } = req.body;

  const productId = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      $set: {
        title,
        image,
        summary,
        price,
        oldPrice,
        description,
        color,
        quantity,
        special,
        brand,
      },
    });

    res
      .status(200)
      .json({ success: "Product uccesfully updated.", updatedProduct });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong whilst updating the product.",
      err,
    });
  }
}

async function updateOrder(req: Request, res: Response) {
  const newStatus = req.body.newStatus;
  const orderId = req.params.orderId;

  const order = new OrderClass(null, null, newStatus, orderId);

  try {
    const savedOrder = await order.saveOrder();
    res
      .status(200)
      .json({ message: "Order successfully updated!", savedOrder });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message:
        "Unfortunately, something went wrong in our server whilst saving the order.",
    });
  }
}

async function fetchAllOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ _id: -1 })
      .populate("user", { password: 0 })
      .populate({
        path: "cart",
        populate: {
          path: "items.product",
          model: "Product",
        },
      });

    interface AddressI extends Document {
      _id: string;
      street: string;
      city: string;
      postalCode: string;
      createdAt?: string;
      updatedAt?: string;
    }

    let existingAddress: AddressI | null;

    const addresses: AddressI[] = [];

    await Promise.all(
      orders.map(async (order) => {
        const existingAddressQuery = Address.findOne({
          _id: order.user._id,
        }).sort({ _id: -1 });
        existingAddress = await existingAddressQuery.exec();

        if (existingAddress) {
          const addressExists = addresses.some(
            (address) =>
              address._id.toString() === existingAddress!._id.toString()
          );

          if (!addressExists) {
            addresses.push(existingAddress);
          }
        }

        return existingAddress ? [existingAddress] : []; // Return an array with existingAddress or an empty array
      })
    );

    return res.status(200).json({ orders: orders, usersAddresses: addresses });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong whilst fetching orders." });
  }
}

export {
  getAllProductsForAdmin,
  addNewProduct,
  deleteProduct,
  getProductToUpdate,
  updateProduct,
  updateOrder,
  fetchAllOrders,
};

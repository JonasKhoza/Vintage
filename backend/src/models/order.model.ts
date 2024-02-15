import { Schema, Document, model, Model } from "mongoose";
import User, { UserInterface } from "./user.model";
import { CartInterface, cartSchema } from "./cart.model";
import { ObjectId } from "mongodb";

interface OrderInterface extends Document {
  cart: CartInterface | ObjectId;
  user: UserInterface | ObjectId;
  status: string;
}

const OrderSchema = new Schema(
  {
    cart: {
      type: cartSchema,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order: Model<OrderInterface> = model<OrderInterface>(
  "Order",
  OrderSchema
);

export default Order;

export class OrderClass {
  cart: CartInterface | null;
  user: UserInterface | ObjectId | null;
  status: string;
  orderId?: string;

  constructor(
    cart: CartInterface | null,
    user: UserInterface | ObjectId | null,
    status = "pending",
    orderId?: string
  ) {
    this.cart = cart;
    this.user = user;
    this.status = status;
    this.orderId = orderId;
  }

  //All orders for user
  static findAllOrdersForUser(userId: string) {
    const uid = new ObjectId(userId);

    return Order.find({ user: uid })
      .sort({ _id: -1 })
      .populate("user", { password: 0 })
      .populate({
        path: "cart",
        populate: {
          path: "items.product",
          model: "Product",
        },
      });
  }

  //Single order
  static findOrderById(id: string) {
    const orderId = new ObjectId(id);
    return Order.findById(orderId).populate({
      path: "cart",
      populate: {
        path: "items.product",
        model: "Product",
      },
    });
  }

  saveOrder() {
    if (this.orderId) {
      //Updating an already existing order by admin
      const orderId = new ObjectId(this.orderId);
      return Order.updateOne(
        { _id: orderId },
        { $set: { status: this.status } }
      );
    } else {
      //Adding a new order
      const userObjectId = new ObjectId(this.user!._id);

      const orderDocument = {
        cart: this.cart,
        user: userObjectId,
        status: this.status,
      };

      return Order.create(orderDocument);
    }
  }
}

import { Document, Schema, model, Model } from "mongoose";
import { ProductInterface } from "./product.model";

interface CartItemInterface {
  product: ProductInterface;
  totalPrice: number;
  quantity: number;
}

export interface CartInterface extends Document {
  items: CartItemInterface[];
  totalQuantity: number;
  overallTotalPrice: number;
}

const cartSchema = new Schema<CartInterface>({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        default: [],
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  overallTotalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

const CartModel: Model<CartInterface> = model<CartInterface>(
  "Cart",
  cartSchema
);

interface CartItemInterface {
  product: ProductInterface;
  totalPrice: number;
  quantity: number;
}

export interface CartSessionInterface {
  items: CartItemInterface[];
  totalQuantity: number;
  overallTotalPrice: number;
}

class Cart {
  items: CartItemInterface[];
  totalQuantity: number;
  overallTotalPrice: number;

  constructor(
    items: CartItemInterface[] = [],
    totalQuantity: number = 0,
    overallTotalPrice: number = 0
  ) {
    (this.items = items),
      (this.totalQuantity = totalQuantity),
      (this.overallTotalPrice = overallTotalPrice);
  }

  addItemToCart(product: ProductInterface) {
    let cartItem = {
      product: product,
      totalPrice: +product.price,
      quantity: 1,
    };

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      if (item.product._id.toString() === product._id.toString()) {
        cartItem.totalPrice = +item.totalPrice + +product.price;
        cartItem.quantity = +item.quantity + 1;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.overallTotalPrice += +product.price;

        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.overallTotalPrice += +product.price;
  }

  updateCartItem(productId: string, newQuantity: number) {
    const existingItem = this.items.find(
      (item) => item.product._id.toString() === productId.toString()
    );

    if (existingItem && newQuantity > 0) {
      const quantityChange = +newQuantity - existingItem.quantity;

      existingItem.quantity = +newQuantity;
      existingItem.totalPrice = +newQuantity * existingItem.product.price;
      this.totalQuantity += quantityChange;
      this.overallTotalPrice += quantityChange * existingItem.product.price;
    } else if (existingItem && newQuantity <= 0) {
      const itemIndex = this.items.findIndex(
        (item) => item.product._id.toString() === productId.toString()
      );
      this.totalQuantity -= existingItem.quantity;
      this.overallTotalPrice -= existingItem.totalPrice;
      this.items.splice(itemIndex, 1);
    }
  }
}

export { CartModel, Cart, cartSchema };

import mongoose, { Schema, Document } from "mongoose";

export interface ProductInterface extends Document {
  title: string;
  image: string;
  summary: string;
  oldPrice: number;
  price: number;
  description: string;
  color?: string[];
  quantity: number;
  special?: boolean;
  brand?: string;
  reviews?: {
    username?: string;
    rating?: number;
    comment?: string;
    createdAt?: Date;
    uid?: string;
  }[];
  createdAt: Date | number;
  updatedAt: Date | number;
}

const ProductSchema = new Schema<ProductInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: [String],
      default: undefined,
    },
    quantity: {
      type: Number,
      required: true,
    },
    special: {
      type: Boolean,
      default: undefined,
    },
    brand: {
      type: String,
      default: undefined,
    },
    reviews: [
      {
        username: {
          type: String,
          default: undefined,
        },
        rating: {
          type: Number,
          default: undefined,
        },
        comment: {
          type: String,
          default: undefined,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        uid: {
          type: String,
          default: undefined,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create a compound index on 'title' and 'description' fields
ProductSchema.index({ title: "text", description: "text" });

const Product = mongoose.model<ProductInterface>("Product", ProductSchema);

export default Product;

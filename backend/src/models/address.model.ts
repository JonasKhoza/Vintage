import { ObjectId } from "mongodb";
import { Schema, Document, model, Model } from "mongoose";
export interface AddressInterface extends Document {
  street: string;
  city: string;
  postalCode: string;
}

const AddressSchema = new Schema<AddressInterface>(
  {
    _id: { type: ObjectId, required: true },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Address: Model<AddressInterface> = model<AddressInterface>(
  "Address",
  AddressSchema
);

export default Address;

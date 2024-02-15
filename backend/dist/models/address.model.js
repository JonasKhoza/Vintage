"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    _id: { type: mongodb_1.ObjectId, required: true },
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
}, { timestamps: true });
const Address = (0, mongoose_1.model)("Address", AddressSchema);
exports.default = Address;

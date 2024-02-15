"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect(`mongodb+srv://jonaskhoza18:MJSJ2Q6ldLDGImm7@cluster3.0ai6z9x.mongodb.net/onestore`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Optional: Add a server selection timeout
}) // Type assertion to override type checking
    .then(() => {
    console.log('MongoDB connected successfully');
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
});
const db = mongoose_1.default.connection;
exports.default = db;

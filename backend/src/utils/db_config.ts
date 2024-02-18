import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_HOST!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Optional: Add a server selection timeout
  } as mongoose.ConnectOptions) // Type assertion to override type checking
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error: any) => {
    console.error("MongoDB connection failed:", error);
  });

const db = mongoose.connection;

export default db;

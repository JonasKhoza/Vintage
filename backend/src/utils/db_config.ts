import mongoose from "mongoose";

mongoose
.connect(`mongodb+srv://jonaskhoza18:MJSJ2Q6ldLDGImm7@cluster3.0ai6z9x.mongodb.net/onestore`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Optional: Add a server selection timeout
} as mongoose.ConnectOptions) // Type assertion to override type checking
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((error:any) => {
  console.error('MongoDB connection failed:', error);
});

const db = mongoose.connection;

export default db;
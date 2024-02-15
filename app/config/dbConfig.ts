import mongoose from "mongoose";

export async function connectDb() {
  console.log("was in connectDB")
  try {
    mongoose.connect(process.env.MONGODB_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("error is here",error);
  }
}
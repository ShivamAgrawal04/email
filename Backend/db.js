import mongoose from "mongoose";

const DBURL = process.env.MONGO_URI;

if (!DBURL) console.log("Please specify DB URL");

const connectDB = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log("Couldn't connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;

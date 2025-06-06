import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; 

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string, {
      dbName: "StreamLearn", 
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectMongoDB;
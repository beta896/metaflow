// mongo.js
import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/metaflow';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('? MongoDB connected successfully');
  } catch (error) {
    console.error('? MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

import mongoose from 'mongoose';

export async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('[MONGO CONNECTED]');
  } catch (err) {
    console.error('[MONGO ERROR]', err.message);
  }
}

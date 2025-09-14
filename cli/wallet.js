// cli/wallet.js
import mongoose from 'mongoose';
import Wallet from '../models/Wallet.js'; // Make sure Wallet.js uses `export default`

async function deposit(userId, amount, source = 'manual') {
  await mongoose.connect('mongodb://localhost/metaflow'); // adjust as needed
  const wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    console.log('❌ Wallet not found.');
    return;
  }

  wallet.balance += amount;
  wallet.transactions.push({
    type: 'deposit',
    amount,
    source
  });

  await wallet.save();
  console.log(`✅ Deposited EGP ${amount} to wallet of user ${userId}. New balance: ${wallet.balance}`);
  await mongoose.disconnect();
}

// CLI trigger
const [,, cmd, userId, amount] = process.argv;
if (cmd === 'deposit') {
  deposit(userId, parseFloat(amount));
}
// cli.js
import mongoose from 'mongoose';
import { connectRedis } from './config/redisClient.js';
import fs from 'fs';
import path from 'path';
import { createWallet } from './lib/walletOps.js'; // ✅ Corrected path

const command = process.argv[2];
const redis = connectRedis();

async function handleWalletCreate() {
  const userId = process.argv[3];
  if (!userId) {
    console.error('❌ Missing userId. Usage: node cli.js wallet:create <userId>');
    process.exit(1);
  }

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/metaflow');
    const wallet = await createWallet(userId, {
      createdBy: 'CLI',
      source: 'cli.js'
    });
    console.log(`✅ Wallet created for user ${userId}`);
  } catch (err) {
    console.error('🔥 Wallet creation failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    redis.quit();
  }
}

switch (command) {
  case 'redis:flush':
    redis.flushall((err) => {
      if (err) {
        console.error('❌ Redis flush failed:', err.message);
        process.exit(1);
      }
      console.log('✅ Redis flushed');
      redis.quit();
    });
    break;

  case 'audit:report':
    const report = {
      timestamp: Date.now(),
      status: 'clean',
      violations: [],
      source: 'cli.js',
    };
    redis.setex(`audit:report:${Date.now()}`, 3600, JSON.stringify(report), (err) => {
      if (err) {
        console.error('❌ Audit report push failed:', err.message);
        process.exit(1);
      }
      console.log('✅ Audit report pushed');
      redis.quit();
    });
    break;

  case 'assets:track':
    const assetId = process.argv[3];
    const status = process.argv[4] || 'registered';
    if (!assetId) {
      console.error('❌ Missing assetId');
      process.exit(1);
    }
    const assetPayload = { assetId, status, timestamp: Date.now() };
    redis.setex(`asset:${assetId}`, 86400, JSON.stringify(assetPayload), (err) => {
      if (err) {
        console.error('❌ Asset tracking failed:', err.message);
        process.exit(1);
      }
      console.log(`✅ Asset ${assetId} tracked with status '${status}'`);
      redis.quit();
    });
    break;

  case 'ci:check':
    redis.ping((err, res) => {
      const checks = {
        redis: res === 'PONG',
        paths: ['config', 'routes', 'models'].map((dir) => {
          const exists = fs.existsSync(path.resolve(dir));
          return { dir, exists };
        }),
      };

      const allPathsExist = checks.paths.every(p => p.exists);
      const allSystemsGo = checks.redis && allPathsExist;

      if (allSystemsGo) {
        console.log('✅ All systems go');
      } else {
        console.error('❌ CI check failed:', checks);
        process.exit(1);
      }
      redis.quit();
    });
    break;

  case 'wallet:create':
    await handleWalletCreate();
    break;

  default:
    console.log(`❓ Unknown command: ${command}`);
    process.exit(1);
}
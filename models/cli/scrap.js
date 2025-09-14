#!/usr/bin/env node
// @audit-cli: Scrap Logger — triggers scrap events with audit traceability

import { program } from 'commander';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scrap from '../models/Scrap.js';
import Inventory from '../models/Inventory.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

program
  .requiredOption('-s, --sku <sku>', 'SKU of the inventory to scrap')
  .requiredOption('-r, --reason <reason>', 'Reason for scrapping')
  .option('-n, --notes <notes>', 'Additional notes')
  .option('-d, --department <department>', 'Department name', 'global')
  .option('-u, --user <user>', 'User triggering the scrap', 'cli');

program.parse(process.argv);
const opts = program.opts();

(async () => {
  const inventory = await Inventory.findOne({ sku: opts.sku });
  if (!inventory) {
    console.error(`❌ Inventory with SKU ${opts.sku} not found`);
    process.exit(1);
  }

  const scrap = new Scrap({
    inventoryId: inventory._id,
    reason: opts.reason,
    notes: opts.notes,
    department: opts.department,
    scrappedBy: opts.user,
  });

  await scrap.save();
  inventory.isActive = false;
  inventory.deletedAt = new Date();
  await inventory.save();

  console.log(`✅ Scrapped SKU ${opts.sku} for reason: ${opts.reason}`);
  mongoose.disconnect();
})();

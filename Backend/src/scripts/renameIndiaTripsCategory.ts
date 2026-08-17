// src/scripts/renameIndiaTripsCategory.ts
//
// One-time migration: renames the trip category "india-trips" to "nepal-trips".
//
//   - trips.tripCategory       (array of strings)
//   - agenttrips.tripCategory  (single string)
//
// Dry run by default; pass --apply to write.
//
//   npx ts-node src/scripts/renameIndiaTripsCategory.ts
//   npx ts-node src/scripts/renameIndiaTripsCategory.ts --apply
//
// Idempotent: re-running after a successful apply finds nothing to do.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const APPLY = process.argv.includes('--apply');
const OLD = 'india-trips';
const NEW = 'nepal-trips';

async function run() {
  const mongoUri = process.env.MONGO_URI || '';
  if (!mongoUri) {
    console.error('❌ MONGO_URI is not set in Backend/.env');
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  if (!db) {
    console.error('❌ No database handle after connecting');
    process.exit(1);
  }
  console.log(`✅ Connected to MongoDB (${mongoose.connection.name})`);
  console.log(APPLY ? '🔧 MODE: APPLY' : '👀 MODE: DRY RUN');
  console.log('');

  // ---- trips: tripCategory is an array ----
  const trips = await db.collection('trips').find({ tripCategory: OLD }).toArray();
  console.log(`=== trips with "${OLD}" : ${trips.length} ===`);
  for (const t of trips) {
    const next = (t.tripCategory || []).map((c: string) => (c === OLD ? NEW : c));
    console.log(`  ${String(t.name).slice(0, 44).padEnd(46)} [${t.tripCategory}] -> [${next}]`);
  }
  if (APPLY && trips.length > 0) {
    const res = await db
      .collection('trips')
      .updateMany({ tripCategory: OLD }, { $set: { 'tripCategory.$[el]': NEW } }, {
        arrayFilters: [{ el: OLD }],
      } as any);
    console.log(`  -> modified ${res.modifiedCount} trip(s)`);
  }

  // ---- agenttrips: tripCategory is a single string ----
  const agentTrips = await db
    .collection('agenttrips')
    .find({ tripCategory: OLD })
    .toArray();
  console.log('');
  console.log(`=== agent trips with "${OLD}" : ${agentTrips.length} ===`);
  for (const t of agentTrips) {
    console.log(`  ${String(t.name || t._id).slice(0, 44)}`);
  }
  if (APPLY && agentTrips.length > 0) {
    const res = await db
      .collection('agenttrips')
      .updateMany({ tripCategory: OLD }, { $set: { tripCategory: NEW } });
    console.log(`  -> modified ${res.modifiedCount} agent trip(s)`);
  }

  // ---- verification ----
  console.log('');
  console.log('=== after ===');
  const remainingTrips = await db.collection('trips').countDocuments({ tripCategory: OLD });
  const remainingAgent = await db.collection('agenttrips').countDocuments({ tripCategory: OLD });
  const newTrips = await db.collection('trips').countDocuments({ tripCategory: NEW });
  const newAgent = await db.collection('agenttrips').countDocuments({ tripCategory: NEW });
  console.log(`  trips still "${OLD}"      : ${remainingTrips}`);
  console.log(`  trips now   "${NEW}"      : ${newTrips}`);
  console.log(`  agent trips still "${OLD}": ${remainingAgent}`);
  console.log(`  agent trips now   "${NEW}": ${newAgent}`);
  console.log('');
  if (!APPLY) console.log('👀 Dry run only. Re-run with --apply to write.');

  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

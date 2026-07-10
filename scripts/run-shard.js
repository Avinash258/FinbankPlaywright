#!/usr/bin/env node
'use strict';

const { spawnSync } = require('node:child_process');

const shardIndex = process.argv[2];
const shardTotal = process.argv[3];
const extraArgs = process.argv.slice(4);

if (!shardIndex || !shardTotal) {
  console.error('Usage: npm run test:shard -- <index> <total> [-- project flags]');
  console.error('Example: npm run test:shard -- 1 4');
  console.error('Example: npm run test:shard -- 2 4 -- --project=ui');
  process.exit(1);
}

const result = spawnSync(
  'npx',
  ['playwright', 'test', `--shard=${shardIndex}/${shardTotal}`, ...extraArgs],
  {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      SHARD_INDEX: shardIndex,
      SHARD_TOTAL: shardTotal,
    },
  },
);

process.exit(result.status ?? 1);

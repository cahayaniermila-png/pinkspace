const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'node_modules', '@prisma', 'client', 'runtime'),
  path.join(__dirname, 'node_modules', '.prisma', 'client')
];

const filesToDelete = [
  'query_engine_bg.postgresql.wasm',
  'query_engine_bg.mysql.wasm',
  'query_engine_bg.cockroachdb.wasm',
  'query_engine_bg.sqlserver.wasm',
  'query_engine_bg.mongodb.wasm',
  'query_compiler_fast_bg.wasm'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  filesToDelete.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
      console.log(`Deleting ${filePath}`);
      fs.rmSync(filePath, { force: true });
    }
  });
});

console.log("Pruning complete.");

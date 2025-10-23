#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const searchDir = path.join(root, 'src', 'app');

function walk(dir, cb) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const full = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      walk(full, cb);
    } else {
      cb(full);
    }
  });
}

let changed = 0;
walk(searchDir, (file) => {
  if (!file.endsWith('.ts')) return;
  const content = fs.readFileSync(file, 'utf8');
  // Replace occurrences of `styleUrl: '...'` or `styleUrl: "..."` with styleUrls: ['...']
  const fixed = content.replace(/styleUrl:\s*(['\"])(.+?)\1/g, (m, q, p) => {
    changed++;
    return `styleUrls: [${q}${p}${q}]`;
  });
  if (fixed !== content) fs.writeFileSync(file, fixed, 'utf8');
});

if (changed > 0) {
  console.log(`fix-styleurl: updated ${changed} file(s)`);
  process.exit(0);
} else {
  console.log('fix-styleurl: nothing to change');
  process.exit(0);
}

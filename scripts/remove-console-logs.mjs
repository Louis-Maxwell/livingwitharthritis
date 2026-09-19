#!/usr/bin/env node

/**
 * Remove console.log/warn/error statements from source files
 * Keeps: error handling, critical alerts, performance monitoring
 */

import fs from 'fs';
import { writeFileAtomicSync } from './lib/atomic-write.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src');

const EXCLUDED_PATTERNS = [
  /console\.error\([^)]*\);?\s*\/\/ production/i,
  /console\.warn\([^)]*\);?\s*\/\/ production/i,
  /throw.*Error/,
  /RAISE NOTICE/,
];

let filesModified = 0;
let logsRemoved = 0;

function removeConsoleLogs(content) {
  const lines = content.split('\n');
  const modified = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this is a console statement
    if (/console\.(log|warn|error|debug|info)\s*\(/.test(line)) {
      // Keep if it matches excluded patterns
      let keep = false;
      for (const pattern of EXCLUDED_PATTERNS) {
        if (pattern.test(line)) {
          keep = true;
          break;
        }
      }

      if (!keep && !line.includes('production')) {
        // Remove entire statement (handle multi-line)
        let statementEnd = i;
        let braceCount = (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;

        while (braceCount > 0 && statementEnd < lines.length - 1) {
          statementEnd++;
          braceCount += (lines[statementEnd].match(/\(/g) || []).length;
          braceCount -= (lines[statementEnd].match(/\)/g) || []).length;
        }

        // Skip these lines
        i = statementEnd;
        logsRemoved++;
        continue;
      }
    }

    modified.push(line);
  }

  return modified.join('\n');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        walkDir(fullPath);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const modified = removeConsoleLogs(content);

      if (modified !== content) {
        writeFileAtomicSync(fullPath, modified, 'utf-8');
        filesModified++;
        console.log(`✓ ${path.relative(srcDir, fullPath)}`);
      }
    }
  }
}

console.log('Removing console logs from source files...\n');
walkDir(srcDir);

console.log(`\n✅ Done!`);
console.log(`📝 Files modified: ${filesModified}`);
console.log(`🗑️  Logs removed: ${logsRemoved}`);

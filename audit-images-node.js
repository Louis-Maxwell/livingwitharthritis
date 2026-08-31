#!/usr/bin/env node
/**
 * Image Audit Script - Finds missing/broken images and generates fixes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

const ISSUES = [];

function walkDir(dir, extensions = ['.tsx', '.ts']) {
  let files = [];
  try {
    const entries = fs.readdirSync(dir);
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
        files = files.concat(walkDir(fullPath, extensions));
      } else if (stat.isFile() && extensions.some(ext => fullPath.endsWith(ext))) {
        files.push(fullPath);
      }
    });
  } catch (e) {
    // Skip directories we can't read
  }
  return files;
}

function auditFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Find <img> tags
    lines.forEach((line, idx) => {
      const imgMatches = line.match(/<img[^>]*>/gi) || [];

      imgMatches.forEach(imgTag => {
        // Check for alt text
        if (!imgTag.match(/alt\s*=/i)) {
          ISSUES.push({
            file: path.relative(ROOT, filePath),
            line: idx + 1,
            severity: 'critical',
            type: 'missing-alt',
            tag: imgTag.substring(0, 80),
          });
        }

        // Check for dimensions
        if (!imgTag.match(/width\s*=/i) && !imgTag.match(/height\s*=/i) && !imgTag.match(/className.*[wh]-/)) {
          ISSUES.push({
            file: path.relative(ROOT, filePath),
            line: idx + 1,
            severity: 'warning',
            type: 'missing-dimensions',
            tag: imgTag.substring(0, 80),
          });
        }

        // Check for empty src
        if (imgTag.match(/src\s*=\s*["']["']/)) {
          ISSUES.push({
            file: path.relative(ROOT, filePath),
            line: idx + 1,
            severity: 'critical',
            type: 'empty-src',
            tag: imgTag.substring(0, 80),
          });
        }
      });
    });
  } catch (e) {
    console.error(`Error reading ${filePath}: ${e.message}`);
  }
}

console.log('🖼️  Running Image Audit\n');
console.log('========================================\n');

// Scan all files
const files = walkDir(SRC);
console.log(`📁 Scanning ${files.length} TypeScript/TSX files...\n`);

files.forEach(auditFile);

// Group by severity
const critical = ISSUES.filter(i => i.severity === 'critical');
const warnings = ISSUES.filter(i => i.severity === 'warning');

console.log('📊 Audit Results\n');
console.log(`Critical Issues: ${critical.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log(`Total: ${ISSUES.length}\n`);

if (critical.length > 0) {
  console.log('🚨 CRITICAL ISSUES:\n');
  critical.slice(0, 20).forEach(issue => {
    console.log(`  ${issue.file}:${issue.line}`);
    console.log(`    Type: ${issue.type}`);
    console.log(`    Tag: ${issue.tag}\n`);
  });
  if (critical.length > 20) {
    console.log(`  ... and ${critical.length - 20} more critical issues\n`);
  }
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.slice(0, 10).forEach(issue => {
    console.log(`  ${issue.file}:${issue.line} - ${issue.type}`);
  });
  if (warnings.length > 10) {
    console.log(`  ... and ${warnings.length - 10} more warnings\n`);
  }
}

console.log('========================================\n');
console.log('✅ Audit Complete!\n');

// Save report
const report = {
  timestamp: new Date().toISOString(),
  total: ISSUES.length,
  critical: critical.length,
  warnings: warnings.length,
  issues: ISSUES,
};

fs.writeFileSync(path.join(ROOT, 'image-audit-report.json'), JSON.stringify(report, null, 2));
console.log('📄 Report saved to: image-audit-report.json\n');

// Exit with error if critical issues found
process.exit(critical.length > 0 ? 1 : 0);

/**
 * Atomic file writes for build scripts (CodeQL js/file-system-race).
 * Write to a unique sibling temp file, then rename into place.
 */
import {
  writeFileSync,
  renameSync,
  unlinkSync,
  mkdirSync,
  openSync,
  writeSync,
  closeSync,
  fsyncSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { randomBytes } from "node:crypto";

function tempSibling(filePath) {
  const id = randomBytes(8).toString("hex");
  return join(dirname(filePath), `.${id}.${process.pid}.tmp`);
}

function isBinary(data) {
  return (
    typeof Buffer !== "undefined" && Buffer.isBuffer(data)
  ) || data instanceof Uint8Array;
}

/** Synchronously write `data` to `filePath` via temp + rename. */
export function writeFileAtomicSync(filePath, data, encoding = "utf8") {
  mkdirSync(dirname(filePath), { recursive: true });
  const tmp = tempSibling(filePath);
  try {
    if (isBinary(data)) {
      writeFileSync(tmp, data);
    } else {
      writeFileSync(tmp, data, encoding);
    }
    renameSync(tmp, filePath);
  } catch (err) {
    try {
      unlinkSync(tmp);
    } catch {
      /* ignore */
    }
    throw err;
  }
}

/** Async atomic write (Promises API). */
export async function writeFileAtomic(filePath, data, encoding = "utf8") {
  const { writeFile, rename, unlink, mkdir } = await import("node:fs/promises");
  await mkdir(dirname(filePath), { recursive: true });
  const tmp = tempSibling(filePath);
  try {
    if (isBinary(data)) {
      await writeFile(tmp, data);
    } else {
      await writeFile(tmp, data, encoding);
    }
    await rename(tmp, filePath);
  } catch (err) {
    try {
      await unlink(tmp);
    } catch {
      /* ignore */
    }
    throw err;
  }
}

/**
 * Create a new file exclusively (O_CREAT|O_EXCL) and write bytes.
 * Useful when CodeQL flags http→file and TOCTOU around existsSync+write.
 */
export function writeFileExclusiveSync(filePath, data) {
  mkdirSync(dirname(filePath), { recursive: true });
  const fd = openSync(filePath, "wx");
  try {
    writeSync(fd, data);
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
}

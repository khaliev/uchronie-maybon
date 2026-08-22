/**
 * Lecture des dimensions intrinsèques JPEG / PNG en Node natif.
 * Zéro dépendance : parse les marqueurs SOF (JPEG) et l'IHDR (PNG).
 * Retourne null si le format n'est pas reconnu.
 */
import { readFileSync } from 'node:fs';

const cache = new Map();

export function imageSize(file) {
  if (cache.has(file)) return cache.get(file);
  let dims = null;
  try {
    const buf = readFileSync(file);
    // PNG : signature 89 50 4E 47, IHDR à offset fixe
    if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
      dims = { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    } else if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
      // JPEG : scan des segments jusqu'au marker SOFn
      let off = 2;
      while (off + 9 < buf.length) {
        if (buf[off] !== 0xff) {
          off += 1;
          continue;
        }
        const marker = buf[off + 1];
        const isSof =
          marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
        if (isSof) {
          dims = {
            height: buf.readUInt16BE(off + 5),
            width: buf.readUInt16BE(off + 7),
          };
          break;
        }
        off += 2 + buf.readUInt16BE(off + 2);
      }
    }
  } catch {
    dims = null;
  }
  cache.set(file, dims);
  return dims;
}

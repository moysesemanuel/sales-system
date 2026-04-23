import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;
const HASH_PREFIX = "scrypt";

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return `${HASH_PREFIX}$${salt}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const [prefix, salt, hash] = storedHash.split("$");

  if (prefix !== HASH_PREFIX || !salt || !hash) {
    return false;
  }

  const expectedHash = Buffer.from(hash, "hex");
  const derivedKey = (await scrypt(password, salt, expectedHash.length)) as Buffer;

  return timingSafeEqual(derivedKey, expectedHash);
}

import crypto from "crypto";

const key = crypto.scryptSync("metaflow-secret-key", "salt", 32);
const iv = Buffer.alloc(16, 0);

export function encryptTag(tag) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(tag, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

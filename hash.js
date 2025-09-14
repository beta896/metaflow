import crypto from "crypto";

export function hashTag(tag) {
  return crypto.createHash("sha256").update(tag).digest("hex");
}

import fs from "fs";
import path from "path";

export function loadReplies() {
  const jsonPath = path.join(process.cwd(), "config", "replies.json");
  const rawData = fs.readFileSync(jsonPath);
  return JSON.parse(rawData);
}

export function loadKeywords() {
  const jsonPath = path.join(process.cwd(), "config", "frogKeywords.json");
  const rawData = fs.readFileSync(jsonPath);
  return JSON.parse(rawData);
}

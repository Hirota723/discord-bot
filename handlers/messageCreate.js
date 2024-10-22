import fs from "fs";
import path from "path";

const jsonPath = path.join(process.cwd(), "config/frogKeywords.json");
const rawData = fs.readFileSync(jsonPath);
const { keywords: frogKeywords } = JSON.parse(rawData);

export function handleMessageCreate(message) {
  if (message.author.bot) return;

  if (message.content === "ゲロゲロ") {
    message.reply("ゲロゲロ〜!");
    return;
  }

  const isFrog = frogKeywords.some((keyword) =>
    message.content.includes(keyword)
  );

  if (isFrog) {
    message.reply("それは蛙化されるんとちゃうか？");
  }
}

import { loadReplies, loadKeywords } from "../utils/loadFile.js";

export function handleMessageCreate(message) {
  if (message.author.bot) return;

  const replies = loadReplies();

  if (replies[message.content]) {
    message.reply(replies[message.content]);
    return;
  }

  const { mild, moderate, severe } = loadKeywords();
  let score = 0;

  if (mild.some((keyword) => message.content.includes(keyword))) {
    score += 1;
  }

  if (moderate.some((keyword) => message.content.includes(keyword))) {
    score += 2;
  }

  if (severe.some((keyword) => message.content.includes(keyword))) {
    score += 3;
  }

  if (score === 0) {
    return;
  } else if (score === 1) {
    message.reply("蛙化になるかも...気をつけて！");
  } else if (score === 2) {
    message.reply("蛙化だよ、注意して！");
  } else if (score >= 3) {
    message.reply("蛙化すぎる！ちょっと落ち着こう！");
  }
}

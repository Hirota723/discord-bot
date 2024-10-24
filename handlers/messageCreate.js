const { loadReplies, loadKeywords } = require("../utils/loadFile.js");

const handleMessageCreate = async (message, model) => {
  if (message.author.bot) return;

  const replies = loadReplies();
  const response = getReplyFromReplies(message.content, replies);
  if (response) {
    message.reply(response);
    return;
  }

  const score = await calculateScoreWithAI(message.content, model);
  if (score > 0) {
    respondBasedOnScore(message, score);
  }
};

const getReplyFromReplies = (content, replies) => {
  return replies[content] || null;
};

// AIを利用してメッセージとキーワードの類似度を評価する関数
const calculateScoreWithAI = async (content, model) => {
  const { mild, moderate, severe } = loadKeywords();
  let score = 0;

  score += await getSimilarityScore(content, mild, model, 1);
  score += await getSimilarityScore(content, moderate, model, 2);
  score += await getSimilarityScore(content, severe, model, 3);

  return score;
};

// 特定のキーワードリストに対する類似度を評価し、スコアを加算
const getSimilarityScore = async (content, keywords, model, scoreValue) => {
  try {
    const similarityScores = await Promise.all(
      keywords.map(async (keyword) => {
        const prompt = `Does the following text "${content}" have a similar meaning to "${keyword}"? Respond with "yes" or "no".`;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const answer = response.text().toLowerCase().trim();
        return answer === "yes" ? scoreValue : 0;
      })
    );

    return similarityScores.reduce((sum, score) => sum + score, 0);
  } catch (error) {
    console.error("AIによる類似度評価中にエラーが発生しました:", error);
    return 0;
  }
};

const respondBasedOnScore = (message, score) => {
  if (score === 1) {
    message.reply("蛙化になるかも...気をつけて！");
  } else if (score === 2) {
    message.reply("蛙化だよ、注意して！");
  } else if (score >= 3) {
    message.reply("蛙化すぎる！ちょっと落ち着こう！");
  }
};

module.exports = {
  handleMessageCreate,
};

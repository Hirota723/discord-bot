const { loadReplies } = require("../utils/loadFile.js");
const { calculateScoreWithAI } = require("../utils/similarityChecker.js");
const { respondBasedOnScore } = require("../utils/scoreResponder.js");

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

module.exports = {
  handleMessageCreate,
};

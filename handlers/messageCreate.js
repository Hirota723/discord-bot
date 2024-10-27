const { loadReplies } = require("../utils/loadFile.js");
const { calculateScoreWithAI } = require("../utils/similarityChecker.js");

const { respondBasedOnScore } = require("../utils/scoreResponder.js");
const dotenv = require("dotenv");

dotenv.config();

const handleMessageCreate = async (message, model, openai_model, openai) => {
  if (message.author.bot) return;

  const replies = loadReplies();
  const res = getReplyFromReplies(message.content, replies);
  if (res) {
    message.reply(res);
    return;
  }

  async function createAiResponse(message, openai_model) {
    const completion = await openai.chat.completions.create({
      model: openai_model,
      messages: [
        { role: "system", content: "蛙化現象の判定を行ってください。" },
        {
          role: "user",
          content: message.content,
        },
      ],
    });
    console.log("Completion:", completion.choices[0].message.content);
    return completion.choices[0].message.content;
  }

  console.log(message);

  const response = await createAiResponse(message, openai_model);
  if (response) {
    message.reply(response);
    return;
  }

  const score = await calculateScoreWithAI(message.content, model);
  if (score > 0) {
    respondBasedOnScore(message, score);
  }
};

//このコード多分いらん
const getReplyFromReplies = (content, replies) => {
  return replies[content] || null;
};

module.exports = {
  handleMessageCreate,
};

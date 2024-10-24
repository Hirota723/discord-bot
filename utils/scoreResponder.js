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
  respondBasedOnScore,
};

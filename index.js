// .envファイルから環境変数を読み込みます
require("dotenv").config();

// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const { Client, Events, GatewayIntentBits } = require("discord.js");

// 環境変数からトークン、アプリケーションID、ギルドIDを取得します
const token = process.env.DISCORD_TOKEN;

// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return; //BOTのメッセージには反応しない

  if (message.content === "こんにちわ") {
    message.channel.send("こんにちわ！");
  }
});

// ログインします
client.login(token);

const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const dotenv = require("dotenv");
const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const { handleMessageCreate } = require("./handlers/messageCreate.js");
require("./server.js");

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//インスタンスの作成
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

//コンプラの設定(めんどかったので全部外してます。)
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

//使うモデルとコンプラの設定を変数に格納
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: safetySettings,
});

client.once(Events.ClientReady, (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
  client.user.setPresence({
    activities: [{ name: "蛙化", type: ActivityType.Watching }],
    status: "online",
  });
});

client.on("messageCreate", (message) => handleMessageCreate(message, model));

client.login(process.env.DISCORD_TOKEN);

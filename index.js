import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

import http from "http";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "hey") {
    message.reply("Fuck!");
  }
});

const PORT = process.env.PORT || 3000;
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is a Discord Bot running on Render.\n");
  })
  .listen(PORT, () => {
    console.log(`HTTPサーバーがポート${PORT}で起動しました`);
  });

client.login(process.env.DISCORD_TOKEN);

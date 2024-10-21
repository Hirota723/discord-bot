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

  if (message.content === "こんにちわ") {
    message.channel.send("こんにちわ！");
  }
});

client.login(process.env.DISCORD_TOKEN);

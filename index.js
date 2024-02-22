// Command Handler
// Discord Bots
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/bots/discord/06-command-handler.html
// https://youtu.be/B60Q74FHFBQ

console.log("Beep beep! 🤖");

require("dotenv").config();

// const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
// const client = new Discord.Client();
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.login(process.env.BOTTOKEN);

client.on("ready", readyDiscord);

async function readyDiscord() {
  console.log("💖");

  const channel = client.channels.cache.get(process.env.CHANNELID);
  const messages = await lots_of_messages_getter(channel, 50000)
  messages.forEach(async message => console.log(message.content))

  // channel.messages.fetch({ limit: 100 }).then(messages => {
  //   console.log(`Received ${messages.size} messages`);
  //   //Iterate through the messages here with the variable "messages".
  //   messages.forEach(async message => console.log(message.content))
  // })
}

async function lots_of_messages_getter(channel, limit = 500) {
  const sum_messages = [];
  let last_id;

  while (true) {
      const options = { limit: 100 };
      if (last_id) {
          options.before = last_id;
      }

      const messages = await channel.messages.fetch(options);
      messages.forEach(message => {
        sum_messages.push(message);
        last_id = message.id
      })
      // sum_messages.push(...messages.array());
      // last_id = messages.last().id;

      if (messages.size != 100 || sum_messages >= limit) {
          break;
      }
  }

  return sum_messages;
}

// const commandHandler = require("./commands");

// client.on("message", commandHandler);

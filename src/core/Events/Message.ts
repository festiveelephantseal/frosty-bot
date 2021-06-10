import { Message } from "discord.js";
import { BotClient } from "../../lib/Client";
import BaseEvent from "../../lib/Utils/BaseEvent";
import { redBright } from "chalk";

export = class extends BaseEvent {
  constructor() {
    super("message");
  }
  async run(client: BotClient, message: Message) {
    const prefix = "f!";
    if (
      !message.guild ||
      message.author.bot ||
      !message.content.startsWith(prefix)
    )
      return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (err) {
      console.log(redBright(`Error: ${err}`));
    }
  }
};

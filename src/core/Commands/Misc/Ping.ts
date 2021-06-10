import { Message } from "discord.js";
import { BotClient } from "../../../lib/Client";
import BaseCommand from "../../../lib/Utils/BaseCommand";

export = class extends BaseCommand {
  constructor() {
    super({
      name: "ping",
      category: "Misc",
      description: "Check the latency of the bot",
    });
  }

  async run(client: BotClient, message: Message, args: string[]) {
    message.channel.send(`Pong! ${client.ws.ping}`);
  }
};

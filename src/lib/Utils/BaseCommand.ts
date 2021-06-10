import { Message } from "discord.js";
import { BotClient } from "../../lib/Client";
interface CommandOptions {
  name: string;
  category: string | "Misc";
  description: string | "None";
  usage?: string;
  examples?: string[];
}
export default class BaseCommand {
  name: string;
  category: string;
  description: string;
  usage: string;
  examples: string[];
  constructor(options: CommandOptions) {
    this.name = options.name;
    this.category = options.category;
    this.description = options.description;
    this.usage = options.usage;
    this.examples = options.examples;
  }

  async run(
    client: BotClient,
    message: Message,
    args: string[]
  ): Promise<any> {}
}

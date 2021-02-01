import { Message, MessageEmbed } from "discord.js";
import { Command } from "discord-akairo";

import { addCoins } from "../../../lib/utils/AddCoins";

export default class DailyCommand extends Command {
  public constructor() {
    super("work", {
      aliases: ["work", "w"],
      category: "Economy",
      description: {
        content: "get some money",
      },
      channel: "guild",
      cooldown: 14400000,
    });
  }

  public async exec(message: Message): Promise<void> {
    const amount = Math.floor(Math.random() * (2000 - 10) + 10);

    await addCoins(message.author.id, amount);

    const embed: MessageEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(
        `You worked for ${Math.floor(
          amount / 12
        )} hours and earnt **$${amount}**`
      );

    message.channel.send(embed);
  }
}

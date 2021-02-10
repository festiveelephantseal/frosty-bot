import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
export default class ShopCommand extends Command {
  public constructor() {
    super("shop", {
      aliases: ["shop"],
      category: "Economy",
      description: { content: "see all the items to buy!" },
    });
  }
  public exec(message: Message): void {
    const embed = new MessageEmbed().setTitle("The Shop").setColor("BLUE");

    this.client.items.forEach((item) => {
      embed.addField(
        item.name,
        `id: ${item.id}\ndescription: ${item.description}\ncost: ${item.cost}`
      );
    });

    message.util.send(embed);
  }
}

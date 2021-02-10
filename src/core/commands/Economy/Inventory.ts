import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import InventoryModel from "../../../lib/models/InventoryModel";

export default class InventoryCommand extends Command {
  public constructor() {
    super("inventory", {
      aliases: ["inventory"],
      category: "Economy",
      description: { content: "check your inventory" },
    });
  }
  public async exec(message: Message) {
    const duplicates = (arr, obj) => {
      let num = 0;
      arr.forEach((items) => {
        if (obj != items) return;
        num += 1;
      });
      return num;
    };

    const inv = await InventoryModel.findOne({
      userID: message.author.id,
    });

    if (!inv || inv.items.length < 1)
      return message.channel.send("You don't have anything");

    const embed = new MessageEmbed()
      .setTitle(`${message.author.username}'s inventory`)
      .setColor("BLUE")
      .addField("Sword/s", `x${duplicates(inv.items, "sword")}`);

    message.util.send(embed);
  }
}

import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { getCoins } from "../../../lib/utils/GetCoins";
import { subtractCoins } from "../../../lib/utils/SubtractCoins";
import InventoryModel from "../../../lib/models/InventoryModel";

export default class BuyCommand extends Command {
  public constructor() {
    super("buy", {
      aliases: ["buy", "purchase"],
      category: "Economy",
      description: { content: "buy an item from the shop" },
      args: [
        {
          id: "item",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} you need to provide an item to buy`,
          },
        },
      ],
    });
  }
  public async exec(message: Message, { item }: { item: string }) {
    if (item !== "sword" && item !== "wand")
      return message.util.send("That is not a valid item to buy");

    const inv = await InventoryModel.findOne({ userID: message.author.id });

    const coins = await getCoins(message.author.id);

    if (item === "sword") {
      if (coins < 400)
        return message.util.send("You do not have enough money for this!");

      if (!inv) {
        const data = new InventoryModel({
          userID: message.author.id,
          items: ["sword"],
        });
        data.save();
        await subtractCoins(message.author.id, 400);
        return message.util.send("You bought a sword!");
      } else {
        inv.items.push("sword");
        inv.save();
        await subtractCoins(message.author.id, 400);
        return message.util.send("You bought a sword!");
      }
    }
  }
}

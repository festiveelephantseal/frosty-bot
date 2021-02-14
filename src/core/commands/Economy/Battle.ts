import { Command } from "discord-akairo";
import { Message } from "discord.js";
import Inventory from "../../../lib/models/InventoryModel";
import { subtractCoins } from "../../../lib/utils/SubtractCoins";
import { addCoins } from "../../../lib/utils/AddCoins";
import { getCoins } from "../../../lib/utils/GetCoins";

export default class BattleCommand extends Command {
  public constructor() {
    super("battle", {
      aliases: ["battle"],
      category: "Economy",
      description: { content: "battle!" },
      cooldown: 3600000,
      ratelimit: 1,
    });
  }
  public async exec(message: Message) {
    const inv = await Inventory.findOne({
      userID: message.author.id,
    });

    const coins = await getCoins(message.author.id);

    if (coins < 2000) return message.util.send("You're too poor to battle");

    if (!inv)
      return message.util.send(
        "You don't have an inventory setup yet, buy an item to do so first!"
      );

    if (inv.items.includes("sword")) {
      const num = Math.floor(Math.random() * 20);
      const amount = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

      if (num > 10) {
        await subtractCoins(message.author.id, amount);
        const index = inv.items.indexOf("sword");
        inv.items.splice(index, 1);
        inv.save();
        return message.util.send(
          `You lost your battle and lost ${amount} coins`
        );
      } else if (num < 10) {
        await addCoins(message.author.id, amount);
        const index = inv.items.indexOf("sword");
        inv.items.splice(index, 1);
        inv.save();
        return message.util.send(`You won your battle and won ${amount} coins`);
      }
    } else {
      return message.util.send(
        "You do not have a sword, buy one from the shop"
      );
    }
  }
}

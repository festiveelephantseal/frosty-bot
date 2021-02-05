import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import { subtractCoins } from "../../../lib/utils/SubtractCoins";
import { addCoins } from "../../../lib/utils/AddCoins";
import { getCoins } from "../../../lib/utils/GetCoins";

export default class GiveCommand extends Command {
  public constructor() {
    super("give", {
      aliases: ["give", "pay"],
      category: "Economy",
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} Please provide a member to give money to`,
            retry: (msg: Message) =>
              `${msg.author} That is not a valid member to give money to`,
          },
        },
        {
          id: "amount",
          type: "number",
          prompt: {
            start: (msg: Message) => `${msg.author} Please provide an amount`,
            retry: (msg: Message) =>
              `${msg.author} That is not a valid amount of money to give`,
          },
        },
      ],
    });
  }
  public async exec(
    message: Message,
    { member, amount }: { member: GuildMember; amount: number }
  ) {
    const authorCoins = await getCoins(message.author.id);
    if (amount > authorCoins) {
      return message.util.send("You cannot give more money than you have!");
    } else {
      await addCoins(member.user.id, amount);
      await subtractCoins(message.author.id, amount);
      message.util.send(`**${member.user.tag}** was paid **$${amount}**`);
    }
  }
}

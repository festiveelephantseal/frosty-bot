import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";
import { getCoins } from "../../../lib/utils/GetCoins";

export default class BalanceCommand extends Command {
  public constructor() {
    super("balance", {
      aliases: ["balance", "bal", "coins"],
      category: "Economy",
      description: {
        content: "See how much coins you or another user have",
      },
      args: [
        {
          id: "member",
          type: "member",
          default: (msg: Message) => msg.member,
        },
      ],
    });
  }
  public async exec(
    message: Message,
    { member }: { member: GuildMember }
  ): Promise<Message> {
    if (member.user.bot) {
      return message.channel.send("Bots can't have money >:(");
    } else {
      const coins = await getCoins(member.id);
      const { user } = message.guild.members.cache.get(member.id);

      const embed: MessageEmbed = new MessageEmbed()
        .setAuthor(
          `${user.username}'s balance`,
          user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`🏦: $**${coins}**`)
        .setColor("BLUE");
      message.util.send(embed);
    }
  }
}

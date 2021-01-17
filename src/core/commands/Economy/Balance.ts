import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";
import { getCoins } from "../../../lib/utils/GetCoins";

export default class BalanceCommand extends Command {
    public constructor() {
        super("balance", {
            aliases: ["balance", "bal", "coins"],
            category: "Econnomy",
            description: {
                content: "See how much coins you or another user have"
            },
            args: [
                {
                    id: "member",
                    type: "member",
                    default: (msg: Message) => msg.author
                }
            ]
        })
    }
    public async exec(message: Message, { member } : { member: GuildMember}) {
        if (member.user.bot) {
            return message.channel.send("Bots can't have money >:(");
        }

        const coins = await getCoins(member.id);
        const { user } = message.guild.members.cache.get(member.id);

        message.reply(`${user.username} has ${coins} coins`)
    }
}
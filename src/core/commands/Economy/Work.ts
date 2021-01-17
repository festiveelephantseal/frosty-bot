import { Message, MessageEmbed } from "discord.js";
import { Command } from "discord-akairo";

import { addCoins } from "../../../lib/utils/AddCoins";

export default class DailyCommand extends Command {
    public constructor() {
        super("daily", {
            aliases: ["work", "w"],
            description: {
                content: "get some money",
            },
            channel: "guild",
            cooldown: 14400000,
        });
    }

    public exec(message: Message) {
        const amount = Math.random() * (2000 - 10) + 10;

        addCoins(message.author.id, amount);

        const embed: MessageEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
                `You worked for ${amount/10} hours and earnt **$${amount}**`
            )

        message.channel.send(embed);
    }
}

import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class HelpCommand extends Command {
    public constructor() {
        super("help", {
            aliases: ["help"],
            description: {
                content: "see all the commands"
            },
            category: "Misc"
        });
    }

    public exec(message: Message): void {
        const embed: MessageEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`List of commands for ${message.author.username}`)

        for (const category of this.handler.categories.values()) {
            if (["default"].includes(category.id)) continue;
    
            embed.addField(category.id, category
                .filter(cmd => cmd.aliases.length > 0)
                .map(cmd => `**\`${cmd}\`**`)
                .join(" | " || "No Commands in this category."));
        }

        message.channel.send(embed);
    }
}
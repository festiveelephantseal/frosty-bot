import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class InfoCommand extends Command {
  public constructor() {
    super("info", {
      aliases: ["info"],
      description: {
        content: "See information about the bot",
      },
      category: "Misc",
    });
  }
  public exec(message: Message): void {
    // Will get back to doing this later
    const embed: MessageEmbed = new MessageEmbed()
      .setColor("BLUE")
      .addField("Total Servers", this.client.guilds.cache.size);

    message.channel.send(embed);
  }
}

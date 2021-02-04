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
      .setTitle("Frosty Info")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=688085554868518941&permissions=10262&scope=bot"
      )
      .addField("Total Servers", this.client.guilds.cache.size);
    message.channel.send(embed);
  }
}

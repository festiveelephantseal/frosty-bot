import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import CustomCommand from "../../../lib/models/CustomCommandModel";

export default class ListCustomCommands extends Command {
  public constructor() {
    super("tags", {
      aliases: ["tags", "listcustomcommands"],
      category: "Misc",
      description: { content: "list all the custom commands for the server" },
    });
  }
  public async exec(message: Message) {
    const result = await CustomCommand.find({ guildID: message.guild.id });

    if (!result)
      return message.util.send("There are no tags setup for this server");

    const embed = new MessageEmbed()
      .setAuthor(
        `Tags for ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setColor("BLUE")
      .setDescription(result.map((tag) => tag.command));

    message.util.send(embed);
  }
}

import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import LogChannel from "../../../lib/models/LogChannelModel";
import { getGuildPrefix } from "../../../lib/utils/GetPrefix";

export default class SettingsCommand extends Command {
  public constructor() {
    super("settings", {
      aliases: ["settings", "configurations"],
      description: {
        content: "See the current settings for your server",
      },
      category: "Misc",
    });
  }

  public async exec(message: Message) {
    const logchannel = await LogChannel.findOne({
      guildID: message.guild.id,
    });

    const prefix = await getGuildPrefix(message.guild.id);

    const embed: MessageEmbed = new MessageEmbed()
      .addField(
        "Log Channel",
        logchannel ? `<#${logchannel.logChannel}>` : "No Log Channel Set",
        true
      )
      .addField("Prefix", prefix, true)
      .setColor("BLUE")
      .setAuthor(
        `Settings for ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      );

    message.util.send(embed);
  }
}

import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import LogChannel from "../../../lib/models/LogChannelModel";
import MuteRoleModel from "../../../lib/models/MuteRoleModel";
import AutoRole from "../../../lib/models/AutoRole";
import { FrostyMessage } from "../../../lib/interfaces/IMessage";

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

  public async exec(message: FrostyMessage) {
    const logchannel = await LogChannel.findOne({
      guildID: message.guild.id,
    });

    const MuteRole = await MuteRoleModel.findOne({
      guildID: message.guild.id,
    });

    const Autorole = await AutoRole.findOne({
      guildID: message.guild.id,
    });

    const prefix = await message.guild.getPrefix();

    const embed: MessageEmbed = new MessageEmbed()
      .addField(
        "Log Channel",
        logchannel ? `<#${logchannel.logChannel}>` : "No Log Channel Set",
        true
      )
      .addField("Prefix", prefix, true)
      .addField(
        "Mute Role",
        MuteRole ? `<@&${MuteRole.role}>` : "No Mute Role Set"
      )
      .addField(
        "Auto roles",
        Autorole ? Autorole.roles.map((r) => `<@&${r}>`) : "No Auto Roles set"
      )
      .setColor("BLUE")
      .setAuthor(
        `Settings for ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      );

    message.util.send(embed);
  }
}

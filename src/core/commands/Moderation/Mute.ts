import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember, TextChannel } from "discord.js";
import LogChannelModel from "../../../lib/models/LogChannelModel";
import MuteRoleModel from "../../../lib/models/MuteRoleModel";

export default class MuteCommand extends Command {
  public constructor() {
    super("mute", {
      aliases: ["mute"],
      category: "Moderation",
      description: {
        content: "mute someone",
        usage: "@nerd spamming the channel",
      },
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a member to mute`,
            retry: (msg: Message) =>
              `${msg.author} that is not a valid member to mute`,
          },
        },
        {
          id: "reason",
          match: "rest",
          default: "No Reason Provided",
        },
      ],
      userPermissions: ["MUTE_MEMBERS"],
      clientPermissions: ["MANAGE_ROLES"],
      channel: "guild",
    });
  }

  public async exec(
    message: Message,
    { member, reason }: { member: GuildMember; reason: string }
  ) {
    const result = await MuteRoleModel.findOne({
      guildID: message.guild.id,
    });

    const logChannel = await LogChannelModel.findOne({
      guildID: message.guild.id,
    });

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.util.send(
        "You cannot mute this person as they have the same role as you or a higher one"
      );

    if (!result) {
      return message.util.send(
        "There is no mute role set for this server, set one with the `f.setmuterole` command"
      );
    } else {
      member.roles.add(result.role);
      message.util.send(`**${member.user.tag}** was muted for **${reason}**`);

      if (logChannel) {
        const channel = this.client.channels.cache.get(
          logChannel.logChannel
        ) as TextChannel;
        channel.send(
          new MessageEmbed()
            .setAuthor(
              `${member.user.username} was muted!`,
              member.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              `**${member.user.username}** was muted by **${message.author.username}** for **${reason}**`
            )
            .setColor("BLUE")
        );
      }
    }
  }
}

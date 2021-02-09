import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import LogChannelModel from "../../../lib/models/LogChannelModel";
import MuteRoleModel from "../../../lib/models/MuteRoleModel";

export default class MuteCommand extends Command {
  public constructor() {
    super("unmute", {
      aliases: ["unmute"],
      category: "Moderation",
      description: {
        content: "unmute someone",
        usage: "<@mention>",
      },
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a member to unmute`,
            retry: (msg: Message) =>
              `${msg.author} that is not a valid member to unmute`,
          },
        },
      ],
      userPermissions: ["MUTE_MEMBERS"],
      clientPermissions: ["MANAGE_ROLES"],
      channel: "guild",
    });
  }

  public async exec(message: Message, { member }: { member: GuildMember }) {
    const result = await MuteRoleModel.findOne({
      guildID: message.guild.id,
    });

    const logChannel = await LogChannelModel.findOne({
      guildID: message.guild.id,
    });

    if (!result) {
      return message.util.send("There is no mute role set yet");
    }

    if (!member.roles.cache.some((role) => role.id === result.role))
      return message.util.send("This user is not muted");

    member.roles.remove(result.role);
    message.util.send(`**${member.user.tag}** was unmuted`);

    if (logChannel) {
      const channel = this.client.channels.cache.get(
        logChannel.logChannel
      ) as TextChannel;
      channel.send(
        new MessageEmbed()
          .setAuthor(member.user.displayAvatarURL({ dynamic: true }))
          .setDescription(
            `**${member.user.username}** was unmuted by **${message.author.username}**`
          )
      );
    }
  }
}

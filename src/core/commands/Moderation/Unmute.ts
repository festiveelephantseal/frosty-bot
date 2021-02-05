import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
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
      userPermissions: ["MANAGE_MESSAGES"],
      channel: "guild",
    });
  }

  public async exec(message: Message, { member }: { member: GuildMember }) {
    const result = await MuteRoleModel.findOne({
      guildID: message.guild.id,
    });

    if (!result) {
      return message.util.send("There is no mute role set yet");
    }

    if (!member.roles.cache.some((role) => role.id === result.role))
      return message.util.send("This user is not muted");

    member.roles.remove(result.role);
    message.util.send(`**${member.user.tag}** was unmuted`);
  }
}

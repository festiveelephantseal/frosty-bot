import { Command } from "discord-akairo";
import { Message, GuildMember } from "discord.js";
import MuteRoleModel from "../../../lib/models/MuteRoleModel";
import ms from "ms";

export default class TempMuteCommand extends Command {
  public constructor() {
    super("tempmute", {
      aliases: ["tempmute", "temporarymute"],
      category: "Moderation",
      description: {
        content: "temporarily mute someone",
      },
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a member to temp mute`,
            retry: (msg: Message) =>
              `${msg.author} that is not a valid member to temp mute`,
          },
        },
        {
          id: "time",
          type: (_, str) => (str ? ms(str) : null),
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a duration of time for this user to be muted`,
            retry: (msg: Message) =>
              `${msg.author} that is not a valid amount of time to temp mute`,
          },
        },
        {
          id: "reason",
          match: "rest",
          default: "No Reason Provided",
        },
      ],
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MUTE_MEMBERS"],
    });
  }
  public async exec(
    message: Message,
    { member, time, reason }: { member: GuildMember; reason: string; time: any }
  ) {
    const result = await MuteRoleModel.findOne({
      guildID: message.guild.id,
    });

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.util.send(
        "You cannot mute this person as they have the same role as you or a higher one"
      );

    if (!result) {
      return message.util.send(
        "There is no mute role set for this server, set one witht the `f.setmuterole` command"
      );
    } else {
      member.roles.add(result.role);
      message.util.send(
        `<@${member.user.id}> has been muted for the duration of ${ms(
          time
        )} | Reason: ${reason}`
      );

      setTimeout(() => {
        member.roles.remove(result.role);
        try {
          member.send(
            `You have been unmuted in ${message.guild.name} as your temp mute has expired`
          );
        } catch (err) {
          this.client.logger.error(err);
        }
      }, time);
    }
  }
}

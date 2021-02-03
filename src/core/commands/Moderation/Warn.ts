import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import WarnModel from "../../../lib/models/WarningModel";

export default class WarnCommand extends Command {
  public constructor() {
    super("warn", {
      aliases: ["warn"],
      category: "Moderation",
      description: {
        content: "warn those naughty server members!",
        usage: "@nerd reason:I don't like you",
      },
      userPermissions: ["MANAGE_MESSAGES"],
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a member to warn`,
            retry: (msg: Message) =>
              `${msg.author} that is not a valid member to warn`,
          },
        },
        {
          id: "reason",
          type: "string",
          flag: "reason:",
          default: "No Reason Provided",
        },
      ],
    });
  }
  public async exec(
    message: Message,
    { member, reason }: { member: GuildMember; reason: string }
  ) {
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.util.send(
        "You cannot warn this person as they have the same role as you or a higher one"
      );

    const result = await WarnModel.findOne({
      guildID: message.guild.id,
      userID: member.id,
    });

    if (!result) {
      const data = new WarnModel({
        guildID: message.guild.id,
        userID: member.id,
        warns: [
          {
            moderator: message.author.id,
            reason: reason,
          },
        ],
      });
      data.save();
      message.util.send(`**${member.user.tag}** was warned for **${reason}**`);
    } else if (result) {
      result.warns.unshift({
        moderator: message.author.id,
        reason: reason,
      });

      result.save();
      message.util.send(
        `**${member.user.tag}** has been warned for **${reason}**`
      );
    }
  }
}

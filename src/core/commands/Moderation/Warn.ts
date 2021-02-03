import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember, TextChannel } from "discord.js";
import WarnModel from "../../../lib/models/WarningModel";
import LogChannel from "../../../lib/models/LogChannelModel";

export default class WarnCommand extends Command {
  public constructor() {
    super("warn", {
      aliases: ["warn"],
      category: "Moderation",
      description: {
        content: "warn those naughty server members!",
        usage: "@nerd I don't like you",
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
          match: "rest",
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

      const res = await LogChannel.findOne({
        guildID: message.guild.id,
      });

      if (!res) return;

      const channel = this.client.channels.cache.get(
        res.logChannel
      ) as TextChannel;
      channel.send(
        new MessageEmbed()
          .setAuthor(
            `${member.user.username} was Warned`,
            member.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `Moderator: **<@${message.author.id}>** | Reason: **${reason}**`
          )
          .setColor("BLUE")
      );
    } else if (result) {
      result.warns.unshift({
        moderator: message.author.id,
        reason: reason,
      });

      result.save();
      message.util.send(
        `**${member.user.tag}** has been warned for **${reason}**`
      );

      const res = await LogChannel.findOne({
        guildID: message.guild.id,
      });

      if (!res) return;

      const channel = this.client.channels.cache.get(
        res.logChannel
      ) as TextChannel;
      channel.send(
        new MessageEmbed()
          .setAuthor(
            `${member.user.username} was Warned`,
            member.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `Moderator: **<@${message.author.id}>** | Reason: **${reason}**`
          )
          .setColor("BLUE")
      );
    }
  }
}

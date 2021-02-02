import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember, TextChannel } from "discord.js";
import LogChannelSchema from "../../../lib/schemas/LogChannelSchema";

export default class Kick extends Command {
  public constructor() {
    super("kick", {
      aliases: ["kick"],
      category: "Moderation",
      description: {
        content: "get kicked",
        usage: "@nerd reason:<reason>",
      },
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} Please provide a valid member to kick`,
            retry: (msg: Message) =>
              `${msg.author} Thats not a valid member to kick`,
          },
        },

        {
          id: "reason",
          match: "option",
          flag: "reason:",
          default: "No reason provided",
        },
      ],
      channel: "guild",
    });
  }

  public async exec(
    message: Message,
    { member, reason }: { member: GuildMember; reason: string }
  ) {
    const clientUser = await message.guild.members.fetch(this.client.user.id);

    if (member.id === message.author.id)
      return message.util.send("You can't ban yourself");

    if (!member.kickable)
      return message.util.send(":x: This member cannot be kicked");
    if (!clientUser.permissions.has("KICK_MEMBERS"))
      return message.util.send(":x: I don't have permission to do this!");

    try {
      member.kick();
      message.util.send(
        new MessageEmbed()
          .setAuthor(
            `${member.user.username} was kicked!`,
            member.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription(`Reason: ${reason}`)
          .setColor("BLUE")
      );

      const result = await LogChannelSchema.findOne({
        guildID: message.guild.id,
      });

      if (!result) return;

      const channel = this.client.channels.cache.get(
        result.logChannel
      ) as TextChannel;
      channel.send(
        new MessageEmbed()
          .setAuthor(
            `${member.user.username} was kicked!`,
            member.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription(`Reason: ${reason}`)
          .setColor("BLUE")
      );
    } catch (e) {
      this.client.logger.error(e);
      message.util.send(`An error has occured | ${e}`);
    }
  }
}

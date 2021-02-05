import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import WarnModel from "../../../lib/models/WarningModel";

export default class WarnsCommand extends Command {
  public constructor() {
    super("warns", {
      aliases: ["warns", "infractions", "warnings"],
      category: "Moderation",
      userPermissions: ["MANAGE_MESSAGES"],
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) => `${msg.author} please provide a member`,
            retry: (msg: Message) => `${msg.author} that is not a valid member`,
          },
        },
      ],
      channel: "guild",
    });
  }
  public async exec(message: Message, { member }: { member: GuildMember }) {
    const result = await WarnModel.findOne({
      guildID: message.guild.id,
      userID: member.id,
    });

    if (!result) return message.util.send(":x: This user has no warnings");

    const embed: MessageEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        `${member.user.tag}'s warnings`,
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        result.warns.map(
          (warn) =>
            `Moderator: <@${warn.moderator}> | Reason: **${warn.reason}**`
        )
      );

    message.util.send(embed);
  }
}

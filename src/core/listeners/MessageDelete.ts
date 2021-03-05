import { Listener } from "discord-akairo";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import LogChannelSchema from "../../lib/models/LogChannelModel";

export default class MessageDeleteListener extends Listener {
  public constructor() {
    super("messageDelete", {
      emitter: "client",
      event: "messageDelete",
    });
  }

  public async exec(message: Message) {
    const result = await LogChannelSchema.findOne({
      guildID: message.guild.id,
    });

    if (!result) return;

    if (message.author.bot) return;

    if (result) {
      const attachments = message.attachments.size
        ? message.attachments.map((attachment) => attachment.proxyURL)
        : null;
      const embed: MessageEmbed = new MessageEmbed()
        .setTitle("Message Deleted")
        .setColor("BLUE")
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription([
          `**》Message ID:** ${message.id}`,
          `**》Channel:** ${message.channel}`,
          `**》Author:** ${message.member.displayName}`,
          `${
            attachments ? `**》Attachments:** ${attachments.join("\n")}` : ""
          }`,
        ]);

      if (message.content.length && message.content.length < 1024) {
        embed.addField("Message Content", `》${message.content}`);
      } else {
        embed.addField(
          "Message Content",
          "》Message content length exceeds 1024"
        );
      }

      const channel = this.client.channels.cache.get(
        result.logChannel
      ) as TextChannel;
      channel.send(embed);
    }
  }
}

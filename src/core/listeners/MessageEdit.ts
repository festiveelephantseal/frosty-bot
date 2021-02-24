import { Listener } from "discord-akairo";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import LogChannelSchema from "../../lib/models/LogChannelModel";

export default class MessageUpdateListener extends Listener {
  public constructor() {
    super("messageUpdate", {
      emitter: "client",
      event: "messageUpdate",
    });
  }

  public async exec(oldMessage: Message, newMessage: Message) {
    const result = await LogChannelSchema.findOne({
      guildID: oldMessage.guild.id,
    });

    if (!result) return;

    if (oldMessage.author.bot) return;

    if (result) {
      const embed: MessageEmbed = new MessageEmbed()
        .setTitle("Message Edited")
        .setURL(newMessage.url)
        .setColor("BLUE")
        .setDescription(
          `${oldMessage.author.tag} edited a message in <#${oldMessage.channel.id}>`
        )
        .addFields(
          { name: "Old Message", value: oldMessage.content, inline: true },
          { name: "New Message", value: newMessage.content, inline: true }
        );

      const channel = this.client.channels.cache.get(
        result.logChannel
      ) as TextChannel;
      channel.send(embed);
    }
  }
}

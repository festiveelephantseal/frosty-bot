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
      const embed: MessageEmbed = new MessageEmbed()
        .setTitle("Message Deleted")
        .setColor("BLUE")
        .setDescription(`Message deleted in <#${message.channel.id}>`)
        .addField("Content", message.content, true);

      const channel = this.client.channels.cache.get(
        result.logChannel
      ) as TextChannel;
      channel.send(embed);
    }
  }
}

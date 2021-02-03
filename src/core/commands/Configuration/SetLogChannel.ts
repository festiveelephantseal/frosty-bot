import { Command } from "discord-akairo";
import { Message, TextChannel } from "discord.js";
import LogChannel from "../../../lib/models/LogChannelModel";

export default class SetLogChannel extends Command {
  public constructor() {
    super("setlog", {
      aliases: ["setlog", "setlogchannel", "logchannel"],
      category: "Configuration",
      description: {
        content: "Set the log channel",
      },
      args: [
        {
          id: "channel",
          type: "textChannel",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a Text Channel`,
            retry: (msg: Message) =>
              `${msg.author} that is not a valid Text Channel`,
          },
        },
      ],
    });
  }

  public async exec(message: Message, { channel }: { channel: TextChannel }) {
    const result = await LogChannel.findOne({
      guildID: message.guild.id,
    });

    if (result) {
      await LogChannel.findOneAndRemove({
        guildID: message.guild.id,
      });

      message.util.send(`The log channel is now set to <#${channel.id}>`);

      const data = new LogChannel({
        guildID: message.guild.id,
        logChannel: channel.id,
      });

      data.save();
    } else if (!result) {
      message.util.send(`The log channel is now set to <#${channel.id}>`);

      const data = new LogChannel({
        guildID: message.guild.id,
        logChannel: channel.id,
      });

      data.save();
    }
  }
}

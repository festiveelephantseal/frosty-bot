import { Command } from "discord-akairo";
import { Message } from "discord.js";
import PrefixSchema from "../../../lib/models/PrefixModel";

export default class SetPrefixCommand extends Command {
  public constructor() {
    super("setprefix", {
      aliases: ["setprefix", "changeprefix"],
      category: "Configuration",
      description: {
        content: "Set a custom prefix for frosty in your guild!",
      },
      args: [
        {
          id: "prefix",
          type: "string",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a prefix to be set`,
            retry: (msg: Message) => `${msg.author} that is not a valid prefix`,
          },
        },
      ],
      userPermissions: ["MANAGE_MESSAGES"],
    });
  }
  public async exec(message: Message, { prefix }: { prefix: string }) {
    const result = await PrefixSchema.findOne({
      guildID: message.guild.id,
    });

    if (result) {
      result.prefix = prefix;
      result.save();

      message.util.send(`The prefix is now set to ${prefix}`);
    } else if (!result) {
      message.util.send(`The prefix is now set to ${prefix}`);

      const data = new PrefixSchema({
        guildID: message.guild.id,
        prefix: prefix,
      });

      data.save();
    }
  }
}

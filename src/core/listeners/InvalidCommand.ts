import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import CustomCommand from "../../lib/models/CustomCommandModel";
import { getGuildPrefix } from "../../lib/utils/GetPrefix";

export default class InvalidCommand extends Listener {
  public constructor() {
    super("messageInvalid", {
      emitter: "commandHandler",
      event: "messageInvalid",
    });
  }

  public async exec(message: Message) {
    const prefix = await getGuildPrefix(message.guild.id);

    if (message.content.startsWith(prefix)) {
      const result = await CustomCommand.findOne({
        guildID: message.guild.id,
        command: message.content.slice(prefix.length).trim(),
      });
      if (!result) return;
      message.util.send(result.content);
    }
  }
}

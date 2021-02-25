import { Command } from "discord-akairo";
import { Message } from "discord.js";
import CustomCommand from "../../../lib/models/CustomCommandModel";

export default class DeleteCustomCommand extends Command {
  public constructor() {
    super("deletetag", {
      aliases: ["deletetag", "deletecustomcoommand"],
      category: "Configuration",
      description: { content: "delete a custom tag" },
      userPermissions: ["MANAGE_GUILD"],
      args: [
        {
          id: "tag",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a tag to delete`,
          },
        },
      ],
    });
  }
  public async exec(message: Message, { tag }: { tag: string }) {
    const result = await CustomCommand.findOne({
      guildID: message.guild.id,
      command: tag,
    });

    if (!result)
      return message.util.send("There is no such tag with that name");

    result.delete();
    message.util.send(`Successfully delete tag with name \`${tag}\``);
  }
}

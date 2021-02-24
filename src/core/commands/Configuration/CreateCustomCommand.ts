import { Command, Argument } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import CustomCommand from "../../../lib/models/CustomCommandModel";

export default class CreateCustomCommand extends Command {
  public constructor() {
    super("createtag", {
      aliases: ["createtag", "cc", "createcustomcommand", "createcustom"],
      category: "Configuration",
      description: { content: "make a custom command just for your server!" },
      args: [
        {
          id: "command",
          type: Argument.validate(
            "string",
            (m, p, str: string) => str.length < 15
          ),
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a command name to create!`,
            retry: (msg: Message) =>
              `${msg.author} that is not a valid name for a custom command!`,
          },
        },
        {
          id: "content",
          match: "rest",
          type: Argument.validate(
            "string",
            (m, p, str: string) => str.length < 40
          ),
          prompt: {
            start: (msg: Message) => `${msg.author} please provide content!`,
            retry: (msg: Message) => `${msg.author} that is not valid content!`,
          },
        },
      ],
      userPermissions: ["MANAGE_GUILD"],
    });
  }
  public async exec(
    message: Message,
    { command, content }: { command: string; content: string }
  ) {
    const result = await CustomCommand.findOne({
      guildID: message.guild.id,
      command: command,
    });
    if (result)
      return message.util.send(
        "There is already a custom command with that name!"
      );

    await new CustomCommand({
      guildID: message.guild.id,
      command: command,
      content: content,
    }).save();

    message.util.send(`Command with the name \`${command}\` has been created`);
  }
}

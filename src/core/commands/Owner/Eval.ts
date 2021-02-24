import { Command } from "discord-akairo";
import { Message, MessageEmbed, MessageAttachment } from "discord.js";
import { inspect } from "util";

export default class EvalCommand extends Command {
  public constructor() {
    super("eval", {
      aliases: ["eval"],
      category: "Owner",
      description: { content: "evaluate some javascript" },
      ownerOnly: true,
      args: [
        {
          id: "code",
          match: "rest",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide some JS code to evaluate`,
          },
        },
      ],
    });
  }
  public async exec(message: Message, { code }: { code: string }) {
    try {
      let evaluated: string = eval(code);

      if (typeof evaluated !== "string")
        evaluated = inspect(evaluated, { depth: 2 });
      if (evaluated.length > 2000) {
        const output = new MessageAttachment(
          Buffer.from(evaluated),
          "output.txt"
        );
        message.util.send(output);
      } else {
        return message.util.send(
          new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Code Evaluated")
            .setDescription(`Output\n\`\`\`${evaluated}\`\`\``)
        );
      }
    } catch (err) {
      return message.util.send(
        new MessageEmbed()
          .setColor("RED")
          .setTitle("Error")
          .setDescription(`Output\n\`\`\`${err}\`\`\``)
      );
    }
  }
}

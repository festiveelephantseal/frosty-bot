import { Message, MessageEmbed } from "discord.js-light";
import { BotClient } from "../../../lib/Client";
import BaseCommand from "../../../lib/Utils/BaseCommand";

export = class extends BaseCommand {
  constructor() {
    super({
      name: "help",
      category: "Misc",
      description: "Lists commands",
      usage: "help [command]",
      examples: ["help ping", "help"],
    });
  }

  async run(client: BotClient, message: Message, args: string[]) {
    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor("BLUE")
        .addField("Commands", "A list of available commands");
      let c: string[] = [];

      client.commands.forEach((command) => c.push(command.category));
      const categories = [...new Set(c)];

      categories.filter((category) => category !== "Owner");

      categories.forEach((category) => {
        let string = "";
        const commands = client.commands.filter(
          (cmd) => cmd.category === category
        );

        commands.forEach((command) => (string += `\`${command.name}\` `));
        embed.addField(`${category} (${commands.size})`, string);
      });

      message.channel.send(embed);
    } else {
      if (!client.commands.has(args[0]))
        return message.channel.send("This command does not exist.");

      const command = client.commands.get(args[0]);

      message.channel.send(
        new MessageEmbed()
          .setColor("BLUE")
          .setTitle(`\`${command.usage ? command.usage : command.name}\``)
          .addField("Description", command.description)
          .addField(
            "Examples",
            command.examples.length ? command.examples.join("\n") : ""
          )
      );
    }
  }
};

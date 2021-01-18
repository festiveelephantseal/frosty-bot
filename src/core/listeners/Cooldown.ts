import { Message, MessageEmbed } from "discord.js";
import { Command, Listener } from "discord-akairo";

export default class CommandCooldown extends Listener {
  constructor() {
    super("cooldown", {
      emitter: "commandHandler",
      event: "cooldown",
      category: "commands",
    });
  }

  public exec(message: Message, remaining: number, command: Command) {
    this.client.logger.info("fired");

    const embed: MessageEmbed = new MessageEmbed()
      .setTitle("Cooldown Time!")
      .setDescription(
        `You are on cooldown for using the \`${command.id}\`\n Please wait **${
          remaining / 1000
        }** seconds and try again`
      );

    message.util.send(embed);
  }
}

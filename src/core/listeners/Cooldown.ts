import { Message, MessageEmbed } from "discord.js";
import { Listener } from "discord-akairo";

export default class CommandCooldown extends Listener {
  constructor() {
    super("cooldown", {
      emitter: "commandHandler",
      event: "cooldown",
      category: "commands",
    });
  }

  public exec(message: Message, remaining: number): void {
    const embed: MessageEmbed = new MessageEmbed()
      .setTitle("Cooldown Time!")
      .setDescription(
        `Please wait **${remaining / 1000}** seconds and try again`
      );

    message.util.send(embed);
  }
}

import { Message, MessageEmbed } from "discord.js";
import { Listener } from "discord-akairo";
import ms from "ms";

export default class CommandCooldown extends Listener {
  constructor() {
    super("cooldown", {
      emitter: "commandHandler",
      event: "cooldown",
      category: "commands",
    });
  }

  public exec(message: Message, _, amount: number): void {
    const embed: MessageEmbed = new MessageEmbed()
      .setTitle("Cooldown Time!")
      .setColor("BLUE")
      .setDescription(
        `Please wait **${ms(amount, {
          long: true,
        })}** and try again`
      );

    message.util.send(embed);
  }
}

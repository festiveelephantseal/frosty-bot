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

  public exec(message: Message, amount: number): void {
    /* const embed: MessageEmbed = new MessageEmbed()
      .setTitle("Cooldown Time!")
      .setDescription(
        `Please wait **${ms(amount, {
          long: true,
        })}** and try again`
      );

    message.util.send(embed); */
    this.client.logger.info(amount.toString());
  }
}

import { Listener, Command } from "discord-akairo";
import { Message } from "discord.js";

export default class MissingPermissionsEvent extends Listener {
  public constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions",
    });
  }

  public async exec(
    message: Message,
    command: Command,
    type: string,
    missing: any
  ) {
    if (type === "client") {
      return message.util.send(`I am missing the \`${missing}\` permission/s`);
    }

    if (type === "user") {
      return message.util.send(
        `You are missing the \`${missing}\` permission/s`
      );
    }
  }
}

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
    const cM = message.guild.members.fetch(this.client.user.id);
    if (type === "client") {
      (await cM).permissions.has("SEND_MESSAGES")
        ? message.util.send(`I am missing the \`${missing}\` permission/s`)
        : this.client.sendError(`Missing perms in ${message.guild.name}`);
    }

    if (type === "user") {
      return message.util.send(
        `You are missing the \`${missing}\` permission/s`
      );
    }
  }
}

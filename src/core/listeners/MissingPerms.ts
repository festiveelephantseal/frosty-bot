import { Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class MissingPermissionsEvent extends Listener {
  public constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions",
    });
  }

  public async exec(message: Message, type: "client" | "user", missing: any) {
    switch (type) {
      case "client":
        return message.util.send(`I am missing the \`${missing}\` permission`);

      case "user":
        return message.util.send(
          `You are missing the \`${missing}\ permission`
        );
    }
  }
}

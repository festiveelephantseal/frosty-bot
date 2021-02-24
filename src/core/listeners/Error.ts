import { Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class ProcessErrorListener extends Listener {
  public constructor() {
    super("error", {
      emitter: "process",
      event: "error",
    });
  }

  public async exec(error: Error, message: Message) {
    this.client.logger.error(error);
  }
}

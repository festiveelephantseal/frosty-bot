import { Listener } from "discord-akairo";
import { Message } from "discord.js";

export default class CommandBlocked extends Listener {
  public constructor() {
    super("commandBlocked", {
      emitter: "client",
      event: "commandBlocked",
      category: "client",
    });
  }
  public exec(message: Message, _, reason: string): Promise<Message> {
    return message.util.send(
      `Blocked from using this command, Reason: ${reason}`
    );
  }
}

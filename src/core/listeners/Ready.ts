import { Listener } from "discord-akairo";
import items from "../../../items.json";

export default class ReadyListener extends Listener {
  public constructor() {
    super("ready", {
      emitter: "client",
      event: "ready",
      category: "client",
    });
  }
  public exec(): void {
    this.client.logger.info(`Logged in as ${this.client.user.username}`);
    this.client.user.setPresence({ status: "dnd" });

    items.forEach((item) => {
      this.client.items.set(item.name, item);
    });
  }
}

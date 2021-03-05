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
    this.client.user.setActivity({
      type: "WATCHING",
      name: `${this.client.guilds.cache.size} guilds | http://frosty.skynode.me`,
    });

    items.forEach((item) => {
      this.client.items.set(item.name, item);
    });
  }
}

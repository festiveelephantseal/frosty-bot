import { ClientEvents } from "discord.js";
import { BotClient } from "../Client";

export default class BaseEvent {
  public name: keyof ClientEvents;

  constructor(name: keyof ClientEvents) {
    this.name = name;
  }

  async run(client: BotClient, ...args: any) {}
}

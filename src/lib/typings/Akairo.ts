import Logger from "@ayanaware/logger";
import { BotOptions } from "../interfaces/BotOptions";
import { Collection } from "discord.js";
import { Item } from "../interfaces/IItem";

declare module "discord-akairo" {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
    logger: Logger;
    config: BotOptions;
    items: Collection<string, Item>;
  }
}

import Logger from "@ayanaware/logger";
import { BotOptions } from "../interfaces/BotOptions";

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler,
        listenerHandler: ListenerHandler,
        logger: Logger,
        config: BotOptions,
    }
}
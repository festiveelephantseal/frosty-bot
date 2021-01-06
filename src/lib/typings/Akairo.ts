import Logger from "@ayanaware/logger";
import { BotOptions } from "../interfaces/BotOptions";
import { PrismaClient } from "@prisma/client"

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler,
        listenerHandler: ListenerHandler,
        logger: Logger,
        config: BotOptions,
        prisma: PrismaClient
    }
}
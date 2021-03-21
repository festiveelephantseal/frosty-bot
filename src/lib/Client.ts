import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import {
  Message,
  Collection,
  TextChannel,
  MessageEmbed,
  Intents,
} from "discord.js";
import { join } from "path";
import { BotOptions } from "./interfaces/BotOptions";
import Logger from "@ayanaware/logger";
import { getGuildPrefix } from "./utils/GetPrefix";
import { Item } from "../lib/interfaces/IItem";

// Import Structures
import "./structures/Guild";

export default class BotClient extends AkairoClient {
  public logger: Logger = Logger.get("Bot");
  public items: Collection<string, Item> = new Collection();

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, "..", "core", "commands"),
    prefix: async (msg: Message) =>
      msg.guild ? await getGuildPrefix(msg.guild.id) : "f.",
    allowMention: true,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 3e5,
    argumentDefaults: {
      prompt: {
        modifyStart: (_: Message, str: string): string =>
          `${str}\n\nType \`cancel\` to cancel the command...`,
        modifyRetry: (_: Message, str: string): string =>
          `${str}\n\nType \`cancel\` to cancel the command...`,
        timeout: "You took too long, the command has been cancelled.",
        ended:
          "You exceeded the maximum amount of tries, the command has been cancelled.",
        cancel: "This command has been cancelled.",
        retries: 3,
        time: 3e4,
      },
      otherwise: "",
    },
    defaultCooldown: 1500,
  });

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, "..", "core", "listeners"),
  });

  public sendError = (message: string) => {
    const channel = this.channels.cache.get(
      "697596229206540329"
    ) as TextChannel;

    return channel.send(
      new MessageEmbed()
        .setTitle("New Error")
        .setDescription(`Error: ${message}`)
    );
  };

  public constructor(config: BotOptions) {
    super({
      ownerID: config.owners,
      intents: [Intents.NON_PRIVILEGED, Intents.FLAGS.GUILD_MEMBERS],
    });

    this.config = config;
  }

  private async _init(): Promise<void> {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process,
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  public async start(): Promise<string> {
    await this._init();
    return this.login(this.config.token);
  }
}

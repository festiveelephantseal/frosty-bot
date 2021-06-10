import { Client, Collection } from "discord.js-light";
import fs from "fs";
import path from "path";
import BaseCommand from "./Utils/BaseCommand";
import BaseEvent from "./Utils/BaseEvent";
import { whiteBright } from "chalk";

interface Options {
  token: string;
  owners: string[];
}

export class BotClient extends Client {
  Options: Options;
  commands: Collection<string, BaseCommand> = new Collection();
  events: Collection<string, BaseEvent> = new Collection();
  constructor(options: Options) {
    super();
    this.Options = options;
  }

  loadCommands() {
    const subdirs = fs.readdirSync(
      path.join(__dirname, "..", "core", "Commands")
    );

    subdirs.forEach((dir) => {
      const files = fs.readdirSync(
        `${path.join(__dirname, "..", "core", "Commands")}/${dir}`
      );
      files.forEach((file) => {
        const commandConstructor = require(`${path.join(
          __dirname,
          "..",
          "core",
          "Commands"
        )}/${dir}/${file}`);

        const command: BaseCommand = new commandConstructor(this);
        this.commands.set(command.name, command);
        console.log(whiteBright(`Loaded command: ${command.name}`));
      });
    });
  }

  loadEvents() {
    const files = fs.readdirSync(path.join(__dirname, "..", "core", "Events"));

    files.forEach((file) => {
      const eventConstructor = require(`${path.join(
        __dirname,
        "..",
        "core",
        "Events"
      )}/${file}`);

      const event: BaseEvent = new eventConstructor(this);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });
  }

  async start() {
    this.loadCommands();
    this.loadEvents();
    this.login(this.Options.token);
  }
}

import { greenBright } from "chalk";
import { BotClient } from "../../lib/Client";
import BaseEvent from "../../lib/Utils/BaseEvent";

export = class extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client: BotClient) {
    console.log(greenBright(`Logged in as ${client.user.username}`));
  }
};

import { BotClient } from "./lib/Client";
import { token } from "../config.json";

const client: BotClient = new BotClient({
  token: token,
  owners: [],
});

client.start();

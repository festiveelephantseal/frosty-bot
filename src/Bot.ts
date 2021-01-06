import { token, owners } from "../config";
import BotClient from "./lib/Client";

const client: BotClient = new BotClient({token, owners});
client.start();
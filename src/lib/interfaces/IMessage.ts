import { Message } from "discord.js";
import { FrostyGuild } from "./IGuild";

export interface FrostyMessage extends Message {
  guild: FrostyGuild;
}

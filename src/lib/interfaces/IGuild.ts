import { Guild } from "discord.js";

export interface FrostyGuild extends Guild {
  getPrefix(): Promise<string>;
}

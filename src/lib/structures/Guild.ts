import { Structures, Client } from "discord.js";
import Prefix from "../models/PrefixModel";

export class FrostyGuild extends Structures.get("Guild") {
  prefix: string = null;
  async getPrefix(): Promise<string> {
    const res = await Prefix.findOne({ guildID: this.id });

    res ? (this.prefix = res.prefix) : (this.prefix = "f.");

    return this.prefix;
  }
}

Structures.extend("Guild", () => FrostyGuild);

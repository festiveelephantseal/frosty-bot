import { Listener } from "discord-akairo";
import { TextChannel, Guild, MessageEmbed } from "discord.js";
import { Api } from "@top-gg/sdk";
import { topgg } from "../../../config";

export default class GuildCreateListener extends Listener {
  public constructor() {
    super("guildCreate", {
      emitter: "client",
      event: "guildCreate",
    });
  }
  public exec(guild: Guild) {
    const api = new Api(topgg);

    const channel = this.client.channels.cache.get(
      "697596229206540329"
    ) as TextChannel;

    channel.send(
      new MessageEmbed()
        .setColor("BLUE")
        .setAuthor(`Joined ${guild.name}`, guild.iconURL({ dynamic: true }))
    );

    api
      .postStats({
        serverCount: this.client.guilds.cache.size,
        shardCount: this.client.options.shardCount,
      })
      .catch((err) => this.client.sendError(err));
  }
}

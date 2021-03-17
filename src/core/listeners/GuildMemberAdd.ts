import { Listener } from "discord-akairo";
import { GuildMember } from "discord.js";
import AutoRole from "../../lib/models/AutoRole";

export default class GuildMemberAdd extends Listener {
  public constructor() {
    super("guildMemberAdd", {
      emitter: "client",
      event: "guildMemberAdd",
    });
  }
  public async exec(member: GuildMember) {
    const result = await AutoRole.findOne({ guildID: member.guild.id });

    if (!result) return;

    result.roles.length > 1
      ? result.roles.forEach((r) =>
          member.guild.members.cache.get(member.id).roles.add(r)
        )
      : member.guild.members.cache.get(member.id).roles.add(result.roles[0]);
  }
}

import { Command } from "discord-akairo";
import { Role, Message } from "discord.js";
import MuteRole from "../../../lib/models/MuteRoleModel";

export default class SetMuteRoleCommand extends Command {
  public constructor() {
    super("setmuterole", {
      category: "Configuration",
      aliases: ["setmuterole"],
      description: {
        content: "set the mute role",
        usage: "<@rolename>",
      },
      args: [
        {
          id: "role",
          type: "role",
          prompt: {
            start: (msg: Message) => `${msg.author} please provide a role`,
            retry: (msg: Message) => `${msg.author} that is not a valid role`,
          },
        },
      ],
      userPermissions: ["MANAGE_GUILD"],
    });
  }
  public async exec(message: Message, { role }: { role: Role }) {
    const result = await MuteRole.findOne({
      guildID: message.guild.id,
    });

    if (result) {
      result.role = role.id;
      result.save();
      message.util.send(`The mute role has now been set to <@&${role.id}>`);
    } else {
      const data = new MuteRole({
        guildID: message.guild.id,
        role: role.id,
      });
      data.save();
      message.util.send(`The mute role has now been set to <@&${role.id}>`);
    }
  }
}

import { Command } from "discord-akairo";
import { Message, Role } from "discord.js";
import AutoRole from "../../../lib/models/AutoRole";
import { arrayRemove } from "../../../lib/utils/arrayremove";

export default class SetAutoRoleCommand extends Command {
  public constructor() {
    super("autorole", {
      aliases: ["autorole"],
      description: {
        content: "set an autorole or delete an autorole",
      },
      category: "Configuration",
      args: [
        {
          id: "action",
          prompt: {
            start: (msg: Message) => `${msg.author} please provide an action`,
            retry: (msg: Message) => `${msg.author} that is not a valid action`,
          },
        },
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
      clientPermissions: ["MANAGE_ROLES"],
    });
  }
  public async exec(
    message: Message,
    { action, role }: { action: "add" | "remove"; role: Role }
  ) {
    if (action === "add") {
      const result = await AutoRole.findOne({ guildID: message.guild.id });
      if (result) {
        if (result.roles.includes(role.id))
          return message.util.send(
            "That role has already been added to the autorole list"
          );
        result.roles.push(role.id);
        result.save();
        return message.util.send(`Added <@&${role.id}> to the autorole list`);
      } else {
        new AutoRole({ guildID: message.guild.id, roles: [role.id] }).save();
        return message.util.send(`<@&${role.id}> added to the autorole list`);
      }
    }

    if (action === "remove") {
      const result = await AutoRole.findOne({ guildID: message.guild.id });
      if (!result || !result.roles.length)
        return message.util.send(
          "Autorole has not been configured for this server"
        );

      if (!result.roles.includes(role.id))
        return message.util.send(
          "This role isn't configured to be assigned on member join"
        );
      result.roles = arrayRemove(result.roles, role.id);

      result.save();

      return message.util.send(`Removed <@&${role.id}> from the autorole list`);
    }
  }
}

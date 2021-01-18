import { Listener, Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";

export default class MissingPermissionsEvent extends Listener {
    public constructor() {
        super("missingPermissions", {
            emitter: "commandHandler",
            event: "missingPermissions",
        });
    }

    public async exec(message: Message, missing: any) {
        message.channel.send(`You are missing the \`${missing}\` permission`);
    }
}

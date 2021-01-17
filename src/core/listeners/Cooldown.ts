import { Message } from "discord.js"
import { Listener } from "discord-akairo";

export default class CommandCooldown extends Listener {
    constructor() {
        super("cooldown", {
            emitter: "commandHandler",
            event: "cooldown"
        });
    }

    public exec(message: Message, remaining: number): void {
        const final = remaining / 1000
        message.util.send(`You can use that command in \`${final} seconds\``);
    }
}
import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";

export default class Ban extends Command {
    public constructor() {
        super("ban", {
            aliases: ["ban"],
            category: "Moderation",
            description: {
                content: "BAAAAAAAN",
            },
            args: [
                {
                    id: "member",
                    type: "member",
                    prompt: {
                        start: (msg: Message) =>
                            `${msg.author} Please provide a member to ban`,
                        retry: (msg: Message) =>
                            `${msg.author} thats not a valid member to ban`,
                    },
                },
                {
                    id: "reason",
                    match: "option",
                    flag: "reason:",
                    default: "No reason provided"
                },
            ],
            clientPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"],
            channel: "guild",
        });
    }

    public async exec(
        message: Message,
        { member, reason }: { member: GuildMember, reason: string }
    ) {
        const clientUser = await message.guild.members.fetch(
            this.client.user.id
        );

        if (member.id === message.author.id)
            return message.util.send(":x: You can't ban yourself");

        if (member.bannable)
            return message.util.send(":x: This member can't be banned");

        if (!clientUser.permissions.has("BAN_MEMBERS"))
            return message.util.send(":x: I don't have permission to do this!");

        try {
            member.ban();
            message.util.send(
                new MessageEmbed()
                    .setAuthor(
                        `${member.user.username} was banned!`,
                        member.user.displayAvatarURL({ dynamic: true })
                    )
                    .setDescription(`Reason: ${reason}`)
                    .setColor("BLUE")
            );
        } catch (e) {
            this.client.logger.error(e);
            message.util.send(`An error has occured | ${e}`);
        }
    }
}

import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";
export default class GreyscaleCommand extends Command {
  public constructor() {
    super("greyscale", {
      aliases: ["greyscale"],
      category: "Image Manipulation",
      description: { content: "greyscale someones avatar :0" },
      args: [
        {
          id: "member",
          type: "member",
          default: (msg: Message) => msg.member,
        },
      ],
      cooldown: 10000,
      ratelimit: 1,
    });
  }
  public async exec(message: Message, { member }: { member: GuildMember }) {
    message.util.send(
      new MessageEmbed()
        .setTitle(`${member.user.username} was greyscaled!`)
        .setImage(
          `https://some-random-api.ml/canvas/greyscale?avatar=${member.user.avatarURL(
            { format: "png" }
          )}`
        )
        .setColor("BLUE")
    );
  }
}

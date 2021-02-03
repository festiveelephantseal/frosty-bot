import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import axios from "axios";

export default class BlurpifyCommand extends Command {
  public constructor() {
    super("blurpify", {
      aliases: ["blurpify"],
      description: "blurpify someones avatar",
      category: "Image Manipulation",
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
    const msg = await message.channel.send(
      "Blurpifying...(this may take a while)"
    );

    axios
      .get(
        `https://nekobot.xyz/api/imagegen?type=blurpify&image=${member.user.displayAvatarURL(
          { size: 1024, dynamic: true }
        )}`
      )
      .then((res) => {
        if (res.status !== 200) {
          return message.channel.send(
            `API did not return status code 200 (OK) | ${res.status}`
          );
        } else {
          const embed: MessageEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor(
              `${member.user.username} got blurpified`,
              member.user.displayAvatarURL({ dynamic: true })
            )
            .setImage(res.data.message);
          msg.delete();
          message.channel.send(embed);
        }
      });
  }
}

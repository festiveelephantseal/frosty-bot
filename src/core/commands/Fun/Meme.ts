import { Command } from "discord-akairo";
import { Message } from "discord.js";
import axios from "axios";
import { MessageEmbed } from "discord.js";

export default class MemeCommand extends Command {
  public constructor() {
    super("meme", {
      aliases: ["meme"],
      description: {
        content: "meme",
      },
      category: "Fun",
      cooldown: 10000,
      ratelimit: 1,
    });
  }

  public exec(message: Message): void {
    axios.get("https://meme-api.herokuapp.com/gimme").then((res) => {
      if (res.status !== 200) {
        message.channel.send(`Status code did not return 200 | ${res.status}`);
      } else {
        const embed: MessageEmbed = new MessageEmbed()
          .setTitle(res.data.title)
          .setColor("BLUE")
          .setImage(res.data.url)
          .setURL(res.data.postLink)
          .setFooter(`👍 ${res.data.ups}`);

        message.channel.send(embed);
      }
    });
  }
}

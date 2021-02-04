import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import fetch from "node-fetch";

export default class HugCommand extends Command {
  public constructor() {
    super("hug", {
      aliases: ["hug"],
      category: "Fun",
      description: {
        content: "sends an anime hugging GIF",
        usage: "<person id or mention>",
        examples: ["467030554131562506", "@Nerd#0001"],
      },
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) => `${msg.author} who are you going to hug`,
            retry: (msg: Message) =>
              `${msg.author} thats not a valid person to hug`,
          },
        },
      ],
    });
  }

  public exec(message: Message, { member }: { member: GuildMember }) {
    if (member.user.id === message.author.id) return;
    try {
      fetch("https://some-random-api.ml/animu/hug")
        .then((res) => res.json())
        .then((body) => {
          let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.author.username} hugged ${member.user.tag}`)
            .setImage(body.link)
            .setTimestamp(Date.now());
          message.channel.send(embed);
        });
    } catch (e) {
      message.util.send(`Error | ${e}`);
    }
  }
}

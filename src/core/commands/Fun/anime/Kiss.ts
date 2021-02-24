import { Command } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import fetch from "node-fetch";

export default class KissCommand extends Command {
  public constructor() {
    super("kiss", {
      aliases: ["kiss"],
      category: "Fun",
      description: {
        content: "sends a kissing GIF",
        usage: "<person id or mention>",
        examples: ["467030554131562506", "@Nerd#0001"],
      },
      args: [
        {
          id: "member",
          type: "member",
          prompt: {
            start: (msg: Message) => `${msg.author} who are you going to kiss?`,
            retry: (msg: Message) =>
              `${msg.author} thats not a valid person to kiss`,
          },
        },
      ],
    });
  }

  public exec(message: Message, { member }: { member: GuildMember }) {
    if (member.user.id === message.author.id) return;

    try {
      fetch("https://no-api-key.com/api/v1/kiss")
        .then((res) => res.json())
        .then((body) => {
          let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.author.username} kissed ${member.user.tag}`)
            .setImage(body.image)
            .setTimestamp(Date.now());
          message.channel.send(embed);
        })
        .catch((e) => message.util.send(`Error | ${e}`));
    } catch (e) {
      message.util.send(`Error | ${e}`);
    }
  }
}

import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { apiUrl } from "../../../../../config";

export default class SadPikaCommand extends Command {
  public constructor() {
    super("sadpika", {
      aliases: ["sadpika"],
      category: "Image Manipulation",
      description: { content: "sad pikachu :cry:" },
      args: [
        {
          id: "text",
          match: "rest",
          prompt: {
            start: (msg: Message) => `${msg.author} please provide text`,
          },
        },
      ],
    });
  }
  public exec(message: Message, { text }: { text: string }) {
    if (text.length > 30) return message.util.send("Text exceeds length of 20");

    try {
      return message.util.send(
        new MessageEmbed()
          .setTitle(`Sad Pika for ${message.author.username}`)
          .setColor("BLUE")
          .setImage(`${apiUrl}sadpika?text=${encodeURIComponent(text)}`)
      );
    } catch (err) {
      return message.util.send(`Error: ${err}`);
    }
  }
}

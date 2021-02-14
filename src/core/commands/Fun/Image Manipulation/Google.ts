import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { apiUrl } from "../../../../../config";

export default class GoogleCommand extends Command {
  public constructor() {
    super("google", {
      aliases: ["google"],
      category: "Image Manipulation",
      description: { content: "a picture of a google search" },
      args: [
        {
          id: "text",
          match: "rest",
          prompt: {
            start: (msg: Message) => `${msg.author} please provide some text`,
          },
        },
      ],
    });
  }
  public exec(message: Message, { text }: { text: string }) {
    if (text.length > 30) return message.util.send("Text length exceeds 30");

    return message.util.send(
      new MessageEmbed()
        .setTitle(`Google Search for ${message.author.username}`)
        .setColor("BLUE")
        .setImage(`${apiUrl}google?search=${encodeURIComponent(text)}`)
    );
  }
}

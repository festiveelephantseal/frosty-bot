import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { apiUrl } from "../../../../../config";

export default class DuckDuckGoCommand extends Command {
  public constructor() {
    super("duckduckgo", {
      aliases: ["duckduckgo", "ddg"],
      category: "Image Manipulation",
      description: { content: "a picture of a duckduckgo search" },
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
    if (text.length > 50) return message.util.send("Text length exceeds 50");

    return message.util.send(
      new MessageEmbed()
        .setTitle(`DuckDuckGo Search for ${message.author.username}`)
        .setColor("BLUE")
        .setImage(`${apiUrl}duckduckgo?search=${encodeURIComponent(text)}`)
    );
  }
}

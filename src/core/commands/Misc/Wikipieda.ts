import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import axios from "axios";

export default class WikipediaCommand extends Command {
  public constructor() {
    super("wikipedia", {
      aliases: ["wikipedia"],
      description: {
        content: "search wikipedia",
        usage: "<Search Query>",
      },
      category: "Misc",
      args: [
        {
          id: "query",
          prompt: {
            start: (msg: Message) =>
              `${msg.author} please provide a search query`,
          },
        },
      ],
    });
  }

  public exec(message: Message, { query }: { query: string }) {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrlimit=20&prop=pageimages|extracts&exchars=65&exintro&explaintext&exlimit=max&format=json&origin=*`
      )
      .then((res) => {
        if (Object.keys(res.data.query.pages).length < 1) {
          return message.util.send(
            `No results found for search query ${query}`
          );
        }
        const data = Object.values(res.data.query.pages)[0];
        const embed: MessageEmbed = new MessageEmbed()
          .setTitle(`Showing results for ${query}`)
          .setColor("BLUE")
          // @ts-ignore
          .setDescription(`${data.title}\n${data.extract}`);
        if (res.data.thumbnail) {
          embed.setThumbnail(res.data.thumbnail.source);
          message.util.send(embed);
        } else {
          message.util.send(embed);
        }
      });
  }
}

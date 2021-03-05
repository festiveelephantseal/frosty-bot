import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import os from "os";
import bytes from "bytes";
import { findOS } from "../../../lib/utils/OS";
import { cputemp } from "../../../lib/utils/cputemp";

export default class InfoCommand extends Command {
  public constructor() {
    super("info", {
      aliases: ["info"],
      description: {
        content: "See information about the bot",
      },
      category: "Misc",
    });
  }
  public async exec(message: Message): Promise<void> {
    // Will get back to doing this later
    const embed: MessageEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Frosty Info")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=688085554868518941&permissions=10262&scope=bot"
      )
      .addField("Total Servers", this.client.guilds.cache.size)
      .addField(
        "Memory Statistics",
        `Total Memory: ${bytes(os.totalmem())}\nUsed Memory: ${bytes(
          process.memoryUsage().heapUsed
        )}`
      )
      .addField(
        "CPU Statistics",
        `Core Count: ${
          os.cpus().length
        }\nCPU Arch: ${os.arch()}\nCPU Temperature: ${cputemp()}C`
      )
      .addField(
        "OS Information",
        `OS Type: ${await findOS()}\nKernel Version: ${os.release()}`
      )
      .addField(`Node Version`, process.version);
    message.channel.send(embed);
  }
}

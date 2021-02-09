import { token, owners, topgg } from "../config";
import BotClient from "./lib/Client";
import mongoose from "mongoose";
import { Api } from "@top-gg/sdk";

const client: BotClient = new BotClient({ token, owners });
const api = new Api(topgg);
(() => {
  mongoose
    .connect("mongodb://172.17.0.1:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => client.logger.info("Connected to mongodb"));
  client.start();
  setInterval(() => {
    api.postStats({
      serverCount: client.guilds.cache.size,
      shardCount: client.options.shardCount,
    });
  }, 1800000);
})();

import { token, owners, topgg, mongo } from "../config";
import BotClient from "./lib/Client";
import mongoose from "mongoose";

const client: BotClient = new BotClient({ token, owners });
(() => {
  mongoose
    .connect(mongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => client.logger.info("Connected to mongodb"));
  client.start();
})();

import { token, owners } from "../config";
import BotClient from "./lib/Client";
import mongoose from "mongoose";

const client: BotClient = new BotClient({token, owners});
(() => {
    mongoose.connect("mongodb://127.0.0.1:27017", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => client.logger.info("Connected to mongodb"))
    client.start();
})();
import { token, owners } from "../config";
import BotClient from "./lib/Client";

const client: BotClient = new BotClient({token, owners});
(async () => {
    await client.prisma
        .$connect()
        .then(() => client.logger.info("Connected to postgresql"))

    client.start();
})();
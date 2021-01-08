import mongoose from "mongoose";
import UserSchema from "../schemas/UserSchema";

export const getCoins = async (userID) => {
    try {
        const result = await UserSchema.findOne({
            userID
        })

        let coins = 0;
        if (result) {
            // @ts-ignore
            coins = result.coins
        } else {
            await new UserSchema({
                userID,
                coins
            }).save()
        }
        return coins;

    } finally {
        mongoose.connection.close()
    }
}
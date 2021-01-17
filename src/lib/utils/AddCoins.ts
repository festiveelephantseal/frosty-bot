import User from "../schemas/UserSchema";

export const addCoins = async (userID: string, coins: number) => {
    try {
        return await User.findOne({userID}, (data) => {
            if (data) {
                data.coins += coins;
            } else {
                new User({
                    userID,
                    coins
                })
            }
            data.save();
        })
    } catch (e) {
        throw new Error(e);
    } 
}

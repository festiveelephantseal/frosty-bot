import User from "../models/UserModel";

export const addCoins = async (userID: string, coins: number) => {
  return await User.findOne({ userID }, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data) {
      data.coins += coins;
      data.save();
    } else {
      new User({
        userID,
        coins,
      }).save();
    }
  });
};

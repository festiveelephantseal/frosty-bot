import UserModel from "../models/UserModel";

export const subtractCoins = async (userID: string, amount: number) => {
  const res = await UserModel.findOne({
    userID: userID,
  });

  res.coins -= amount;

  res.save();
};

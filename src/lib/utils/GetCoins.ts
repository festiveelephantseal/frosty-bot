import mongoose from "mongoose";
import UserSchema from "../models/UserModel";

export const getCoins = async (userID) => {
  const result = await UserSchema.findOne({
    userID,
  });

  let coins = 0;
  if (result) {
    // @ts-ignore
    coins = result.coins;
  } else {
    await new UserSchema({
      userID,
      coins,
    }).save();
  }
  return coins;
};

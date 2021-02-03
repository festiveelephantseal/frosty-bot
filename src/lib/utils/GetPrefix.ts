import PrefixSchema from "../models/PrefixModel";

export const getGuildPrefix = async (guildID: string) => {
  const result = await PrefixSchema.findOne({ guildID: guildID });

  if (result) {
    return result.prefix;
  } else if (!result) {
    return "f.";
  }
};

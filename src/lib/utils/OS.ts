import fs from "fs";
import dotenv from "dotenv";

export const findOS = async () => {
  const fileStr = await fs.promises.readFile("/etc/os-release");
  const data = dotenv.parse(fileStr);
  return data.PRETTY_NAME;
};

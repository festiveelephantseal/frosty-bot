import fs from "fs";

export const cputemp = () => {
  const data = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
  return parseInt(data.toString()) / 1000;
};

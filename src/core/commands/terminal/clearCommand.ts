import { CommandType } from "../../command";

const clearCommand: CommandType = {
  func: "clear",
  name: "清屏",
  alias: ["cl"],
  options: [],
  action(options, termial): void {
    setTimeout(() => {
      termial.clear();
    }, 100);
  },
};

export default clearCommand;

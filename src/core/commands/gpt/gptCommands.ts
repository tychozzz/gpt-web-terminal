import { CommandType } from "../../command";
import chatCommand from "./subCommands/chatCommand";

/**
 * gpt命令
 */
const gptCommand: CommandType = {
  func: "gpt",
  name: "gpt",
  alias: [],
  params: [
    {
      key: "subCommand",
      desc: "子命令",
      required: true,
    },
  ],
  subCommands: {
    chat: chatCommand,
  },
  options: [],
  async action(options, terminal) {
    terminal.writeTextOutput(
      "您好，我是 「GPT Terminal」 机器人，请问我能为您做些什么呢？"
    );
  },
};

export default [gptCommand];

import { CommandType } from "../../command";
import chatCommand from "./subCommands/chat/chatCommand";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = GptTerminal.ComponentOutputType;
import roleCommand from "./subCommands/role/roleCommand";
import historyCommand from "./subCommands/history/historyCommand";
import diyCommand from "./subCommands/diy/diyCommand";
import imageCommand from "./subCommands/image/imageCommand";
import modelCommand from "./subCommands/model/modelCommand";

/**
 * gpt命令
 */
const gptCommand: CommandType = {
  func: "gpt",
  name: "gpt 机器人",
  alias: [],
  subCommands: {
    chat: chatCommand,
    role: roleCommand,
    history: historyCommand,
    diy: diyCommand,
    // image: imageCommand,
    // model: modelCommand
  },
  options: [],
  async action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(
        () => import("./subCommands/chat/ChatBox.vue")
      ),
      props: {
        message: "您好，我是 「GPT Terminal」 机器人，请问我能为您做些什么呢？",
      },
    };
    terminal.writeResult(output);
  },
};

export default [gptCommand];

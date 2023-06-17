import { CommandType } from "../../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = GptTerminal.ComponentOutputType;
// import { useMessagesStore } from "../../messagesStore";

// const messagesStore = useMessagesStore();
// const messages = messagesStore.$state.messages;

const historyCommand: CommandType = {
  func: "history",
  name: "查看过去提问与回答记录",
  params: [],
  options: [
    {
      key: "position",
      desc: "聊天记录编号，输出相对应的单条问答记录",
      alias: ["p"],
      type: "string",
    },
  ],
  // 输入1，对应0
  // 输入2，对应2
  // 输入3，对应4
  // 输入4，对应6
  // 输入5，对应8
  async action(options, terminal) {
    const { position } = options;
    const messages = terminal.listGptHistory()
    // 列出全部 gpt 用户提问记录
    if (!position) {
      let index = 1;
      messages.forEach((message) => {
        if (message.role == "user") {
          terminal.writeTextResult(
            `${index} gpt chat -r ${message.name} ${message.content}`
          );
          index += 1;
        }
      });
    } else if (position < 1 || position * 2 > messages.length) {
      terminal.writeTextErrorResult("输入序号有误，请重新输入～");
    } else {
      const inputMessage = messages[(position - 1) * 2];
      const gptCommand = `gpt chat -r ${inputMessage.name} ${inputMessage.content}`;
      const outputMessage = messages[(position - 1) * 2 + 1];
      const gptOutput = outputMessage.content;
      const recordBox: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./RecordBox.vue")),
        props: {
          gptCommand: gptCommand,
          gptOutput: gptOutput,
        },
      };
      terminal.writeResult(recordBox);
    }
  },
};

export default historyCommand;

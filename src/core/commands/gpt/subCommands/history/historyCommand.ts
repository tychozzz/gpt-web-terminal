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
    const messages = terminal.listGptHistory();
    console.log("messages:", messages);
    // const len = messages.reduce(
    //   (acc, cur) => acc + cur.messageElements.length,
    //   0
    // );
    // 列出全部 gpt 用户提问记录
    const allMessages: any = [];
    messages.forEach((message) => {
      message?.messageElements?.forEach((e) => {
        allMessages.push({ ...e, roleKeyword: message.roleKeyword });
      });
    });
    if (!position) {
      let index = 1;
      allMessages?.forEach((e: any) => {
        if (e.role == "user") {
          terminal.writeTextResult(
            `${index} gpt chat -r ${e.roleKeyword} ${e.content}`
          );
          index += 1;
        }
      });
    } else if (position < 1 || position * 2 > allMessages.length) {
      terminal.writeTextErrorResult("输入序号有误，请重新输入～");
    } else {
      const inputMessage = allMessages[(position - 1) * 2];
      const gptCommand = `gpt chat -r ${inputMessage.roleKeyword} ${inputMessage.content}`;
      const outputMessage = allMessages[(position - 1) * 2 + 1];
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

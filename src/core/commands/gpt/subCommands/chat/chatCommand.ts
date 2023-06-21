import { CommandType } from "../../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = GptTerminal.ComponentOutputType;
import { roleMap } from "../role/roles";

const chatCommand: CommandType = {
  func: "chat",
  name: "与GPT聊天",
  params: [
    {
      key: "message",
      desc: "发送给 GPT 的内容",
      required: true,
    },
  ],
  options: [
    {
      key: "role",
      desc: "GPT角色名, 有 default / cli / translator / sql / ikun 五种默认角色可供选择",
      alias: ["r"],
      type: "string",
      defaultValue: "default",
    },
  ],
  async action(options, terminal) {
    const { _, role } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("内容不可为空");
      return;
    }
    // TODO:用户自定义角色后，需要包含进来
    // if (!roleMap.has(role)) {
    //   terminal.writeTextErrorResult("角色不存在");
    //   return;
    // }
    const message = _.join(" ");
    // const res: any = await getGptOutput(message, role);

    // console.log(res);

    // console.log(typeof(res))


    // 调用接口放在 ChatBox 内部去做，传入 ChatBox的参数为用户输入的 message
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./ChatBox.vue")),
      props: {
        message: message,
        role: role,
      },
    };
    terminal.writeResult(output);

    // if (res?.code === 0) {
    //   console.log("gpt响应：", res);
    //   const output: ComponentOutputType = {
    //     type: "component",
    //     component: defineAsyncComponent(() => import("./ChatBox.vue")),
    //     props: {
    //       message: res.data,
    //     },
    //   };
    //   terminal.writeResult(output);
    // } else {
    //   terminal.writeTextErrorResult(res?.message ?? "GPT请求失败");
    // }
  },
};

export default chatCommand;

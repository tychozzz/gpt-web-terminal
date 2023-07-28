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
      desc: "GPT 角色唯一标识",
      alias: ["r"],
      type: "string",
      defaultValue: "default",
    },
    {
      key: "temperature",
      desc: "GPT 采样温度，介于 0 ～ 2 之间，值越大输出越随机",
      alias: ["t"],
      type: "string",
      defaultValue: "1",
    },
  ],
  async action(options, terminal) {
    const { _, role, temperature } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("内容不可为空");
      return;
    }
    if (temperature) {
      if (
        isNaN(temperature) ||
        Number(temperature) < 0 ||
        Number(temperature) > 2
      ) {
        terminal.writeTextErrorResult("temperature 必须为 0 ～ 2 之间的整数");
        return;
      }
    }

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
        temperature: Number(temperature),
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

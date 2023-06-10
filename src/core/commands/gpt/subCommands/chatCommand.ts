import { CommandType } from "../../../command";
import { getGptOutput } from "../gptApi";

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
      desc: "GPT角色名, 有 default / cli / translator 三种默认角色可供选择",
      alias: ["r"],
      type: "string",
      defaultValue: "default",
    },
  ],
  async action(options, terminal) {
    const { _, role } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("内容为空");
      return;
    }
    // TODO:用户自定义角色后，需要包含进来
    if (!["default", "cli", "translator"].includes(role)) {
      terminal.writeTextErrorResult("角色为空");
    }
    const message = _.join(" ");
    const res: any = await getGptOutput(message, role);
    if (res?.code === 0) {
      terminal.writeTextSuccessResult(res.data);
    } else {
      terminal.writeTextErrorResult(res?.message ?? "GPT请求失败");
    }
  },
};

export default chatCommand;

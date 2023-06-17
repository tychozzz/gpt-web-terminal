import { CommandType } from "../../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = GptTerminal.ComponentOutputType;

const diyCommand: CommandType = {
  func: "diy",
  name: "自定义 GPT 角色",
  params: [],
  requireAuth: true,
  options: [
    {
      key: "name",
      desc: "GPT角色名",
      alias: ["n"],
      type: "string",
      required: true,
    },
    {
      key: "desc",
      desc: "角色描述，建议以 “从现在开始，你是一个xxx”开头",
      alias: ["d"],
      type: "string",
      required: true,
    },
  ],
  async action(options, terminal) {
    const { name, desc } = options;
    // TODO:用户自定义角色后，需要包含进来
    if (!name) {
      terminal.writeTextErrorResult("角色名称必填");
      return;
    }
    if (!desc) {
      terminal.writeTextErrorResult("角色描述必填");
      return;
    }
    terminal.writeTextResult(
      "💌 请开始定制您角色的专属 Case 吧，注意最多只接受 5 个 Case 哦～"
    );
    const diyBox: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./DiyBox.vue")),
      props: {
        roleName: name,
        description: desc
      }
    };
    terminal.writeResult(diyBox);
  }
};

export default diyCommand;

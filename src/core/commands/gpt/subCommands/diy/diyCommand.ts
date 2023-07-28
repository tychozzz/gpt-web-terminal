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
      key: "keyword",
      desc: "GPT 角色唯一标识",
      alias: ["k"],
      type: "string",
      required: true,
    },
    {
      key: "name",
      desc: "GPT 角色名",
      alias: ["n"],
      type: "string",
      required: true,
    },
    {
      key: "desc",
      desc: "GPT 角色描述",
      alias: ["d"],
      type: "string",
      required: true,
    },
  ],
  async action(options, terminal) {
    const { keyword, name, desc } = options;
    // TODO:用户自定义角色后，需要包含进来
    if (!keyword) {
      terminal.writeTextErrorResult("角色唯一标识必填");
      return;
    }
    if (!name) {
      terminal.writeTextErrorResult("角色名称必填");
      return;
    }
    if (!desc) {
      terminal.writeTextErrorResult("角色描述必填");
      return;
    }
    const diyBox: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./DiyBox.vue")),
      props: {
        keyword: keyword,
        name: name,
        description: desc,
      },
    };
    terminal.writeResult(diyBox);
  },
};

export default diyCommand;

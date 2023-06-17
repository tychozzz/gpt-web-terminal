import { CommandType } from "../../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = GptTerminal.ComponentOutputType;

const roleCommand: CommandType = {
  func: "role",
  name: "查看所有 GPT 角色",
  params: [],
  options: [],
  async action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./RoleBox.vue")),
    };
    terminal.writeResult(output);
    return;
  },
};

export default roleCommand;

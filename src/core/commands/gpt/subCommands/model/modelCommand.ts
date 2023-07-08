import { CommandType } from "../../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = GptTerminal.ComponentOutputType;

const modelCommand: CommandType = {
  func: "model",
  name: "选择并设置 GPT 模型",
  params: [],
  options: [],
  async action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./ModelSelectBox.vue")),
    };
    terminal.writeResult(output);
    return;
  },
};

export default modelCommand;

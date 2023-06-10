import { CommandType } from "../../../command";
import { defineAsyncComponent } from "vue";
import { commandMap } from "../../../commandRegister";
import ComponentOutputType = GptTerminal.ComponentOutputType;

/**
 * 帮助命令
 * @author yupi
 */
const helpCommand: CommandType = {
  func: "help",
  name: "查看帮助",
  alias: ["man"],
  params: [
    {
      key: "commandName",
      desc: "命令英文名称",
    },
  ],
  options: [],
  collapsible: true,
  action(options, terminal, parentCommand): void {
    const { _ } = options;
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: defineAsyncComponent(() => import("./HelpBox.vue")),
      };
      terminal.writeResult(output);
      return;
    }
    const commandName = _[0];
    let commands = commandMap;
    if (
      parentCommand &&
      parentCommand.subCommands &&
      Object.keys(parentCommand.subCommands).length > 0
    ) {
      commands = parentCommand.subCommands;
    }
    const command = commands[commandName];
    if (!command) {
      terminal.writeTextErrorResult("找不到指定命令");
      return;
    }
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./CommandHelpBox.vue")),
      props: {
        command,
        parentCommand,
      },
    };
    terminal.writeResult(output);
  },
};

export default helpCommand;

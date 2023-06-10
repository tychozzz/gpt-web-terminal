import { CommandType } from "../../command";

const historyCommand: CommandType = {
  func: "history",
  name: "查看执行历史",
  alias: ["h"],
  options: [],
  collapsible: true,
  action(options, terminal): void {
    const commandOutputTypes = terminal.listCommandHistory();
    commandOutputTypes.forEach((command, index) => {
      terminal.writeTextResult(`${index + 1} ${command.text}`);
    });
  },
};

export default historyCommand;

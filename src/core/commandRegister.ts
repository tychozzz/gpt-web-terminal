import { CommandType } from "./command";
import clearCommand from "./commands/terminal/clearCommand";
import historyCommand from "./commands/terminal/historyCommand";
import helpCommand from "./commands/terminal/help/helpCommand";
import shortcutCommand from "./commands/terminal/shortcut/shortcutCommand";
import gptCommands from "./commands/gpt/gptCommands";

/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = [
  ...gptCommands,
  shortcutCommand,
  clearCommand,
  historyCommand,
  helpCommand,
];

/**
 * 命令字典
 */
const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.func] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };

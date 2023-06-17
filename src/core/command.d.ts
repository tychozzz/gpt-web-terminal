import { ParsedOptions } from "getopts";
import TerminalType = GptTerminal.TerminalType;

// 命令类型
interface CommandType {
  func: string; // 唯一命令英文
  name: string; // 命令名称
  desc?: string; // 命令描述
  alias?: string[]; // 命令别名
  params?: CommandParamsType[]; // 参数配置
  options: CommandOptionType[]; // 选项配置
  subCommands?: Record<string, CommandType>; // 子命令
  // 执行功能
  action: (
    options: ParsedOptions,
    terminal: TerminalType,
    parentCommand?: CommandType
  ) => void;
  // 执行子功能
  subAction?: (
    options?: ParsedOptions,
    terminal: TerminalType,
    params?: Record<string, T>,
    parentCommand?: CommandType,
  ) => void;
  // 结果是否允许折叠
  collapsible?: boolean;
  // 是否需要用户登录下才可访问
  requireAuth?: boolean | false;
}

// 命令参数类型
interface CommandParamsType {
  key: string; // 参数名
  desc?: string; // 参数描述
  defaultValue?: string | boolean; // 默认值
  required?: boolean; // 是否必填
}

// 命令选项类型
interface CommandOptionType {
  key: string; // 参数名
  alias?: string[]; // 别名
  desc?: string; // 描述
  type: "string" | "boolean";
  defaultValue?: string | boolean; // 默认值
  required?: boolean; // 是否必填
}

interface Role {
  name: string;
  desc: string;
}

export const roleMap: Map<string, Role> = new Map([
  [
    "default",
    {
      name: "默认角色",
      desc: "无任何定制的普通 GPT 聊天机器人",
    },
  ],
  [
    "cli",
    {
      name: "命令行翻译角色",
      desc: "将你的自然语言指令翻译为 Window/Unix 终端命令",
    },
  ],
  [
    "translator",
    {
      name: "中英文互译角色",
      desc: "将你所发的内容进行中英文互译",
    },
  ],
  [
    "sql",
    {
      name: "SQL 翻译角色",
      desc: "将你的自然语言指令翻译为 SQL 代码",
    },
  ],
  [
    "ikun",
    {
      name: "忠实的 IKun",
      desc: "小黑子～"
    }
  ]
]);

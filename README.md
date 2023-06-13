<p align="center">
  <a href="https://nonebot.dev/"><img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/GPT.png" width="200" height="200" alt="nonebot"></a>
</p>
<div align="center">


# GPT Terminal

<!-- prettier-ignore-start -->
<!-- markdownlint-disable-next-line MD036 -->
_✨ 用程序员的方式，打开GPT！定制专属于你的 GPT 终端 ✨_
<!-- prettier-ignore-end -->

<p align="center">
  <img src="https://img.shields.io/github/v/release/ltyzzzxxx/gpt-web-terminal?display_name=tag" />
  <img src="https://img.shields.io/github/stars/ltyzzzxxx/gpt-web-terminal" />
  <img src="https://img.shields.io/github/forks/ltyzzzxxx/gpt-web-terminal" />
  <img src="https://img.shields.io/github/issues/ltyzzzxxx/gpt-web-terminal" />
  <img src="https://img.shields.io/badge/license-Apache%20-yellow.svg" />
</p>


</div>

## 特别鸣谢

该项目灵感来源于 [YuIndex](https://github.com/liyupi/yuindex)，并最终将其改造为 「GPT Terminal」

- [@程序员鱼皮](https://github.com/liyupi)
- [@MagicCube](https://github.com/MagicCube)

## 简介

GPT Terminal 是一个让你在终端上与 GPT 进行自由对话的平台。

在这里，你可以更加轻易地实现更多定制化的功能，拥有专属于你的 GPT 终端！

## 预览

![gpt-terminal-demo](https://github.com/ltyzzzxxx/gpt-web-terminal/assets/73587471/dee28750-b86b-45a1-a8b2-8357b3e27a25)

## 功能概览

- 支持命令行终端与 GPT 进行对话，我们程序员就是要用极客范儿的方式与 GPT 交流！

- 支持 GPT 市面使用最广泛的 Event Stream 技术，实现打字机效果～

- 支持 GPT 回复内容以 Markdown 形式展现

- 基于 GPT 的中英文翻译助手，地道翻译的最佳选择！

- 基于 GPT 的命令行翻译助手，当你忘记 linux 命令时，就用它！

- 基于 GPT 的 SQL-BOY，当你不知道如何写 SQL语句时，就用它！

- 基本的终端命令，如查看历史命令、帮助手册、清屏等

- 终端用户登录与注册

## 快速开始

你只需简单地了解如何使用 npm / MySQL / Redis，即可解锁全部功能！

1.   将项目克隆到本地

     ```bash
     git clone https://github.com/ltyzzzxxx/gpt-web-terminal.git
     ```

2.   进入项目目录，并分别安装前端与后端依赖

     ```bash
     cd gpt-web-terminal && npm install
     cd server && npm install
     ```

3.   修改后端配置。配置文件位于 `server/config/config.js` 中

     -   你需要将 Redis、MySQL 与 GPT 更改为你自己的配置

4.   运行前端

     ```bash
     npm run dev
     ```

5.   运行后端

     ```bash
     npm run start:dev
     ```

## 如何"调教"属于你的 GPT 角色？

在执行如下步骤之前，请确保已经按照 `快速开始` 完成项目本地部署。

### v1.0.x 版本指南

后续会逐步加入前端界面中自定义角色的功能

1.   进入 `server/src/thirdpart/gptApi/template` 目录下，新建 `markdown` 文件。文件名为角色名。
     -   参照该目录下的其它模板文件
         -   SYSTEM：对 GPT 角色的定义
         -   USER - ASSISTANT：示范提示 GPT 在特定情况下该如何回答 - Prompt
2.   进入 `src/core/commands/gpt/subCommands/roles.ts` 文件中，在数组中添加你之前定义的的角色名（与 `markdown` 模板文件保持一致）。

## 版本规划

- [ ] 支持自定义 GPT 角色并与当前用户绑定，真正实现定制专属于你的 GPT 机器人～
- [ ] 支持查询最近的 GPT 问答会话，使你与 GPT 的交流真正保存下来～
- [ ] 支持机器翻译，提供多种翻译选择～
- [ ] 支持用户在线设置与修改自己的 OpenAI Key，即 Key 与用户绑定～
- [x] 支持 GPT 回复内容以 Markdown 形式展现
- [x] 前端首页展示艺术字体
- [x] 支持 GPT 回复内容 以打字机方式流式输出
- [ ] 支持前端命令行高亮展示
- [ ] 引入角色市场

各位敬请期待～

## 开源协议

Apache License Version 2.0 see http://www.apache.org/licenses/LICENSE

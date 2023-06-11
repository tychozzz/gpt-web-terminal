<p align="center">
  <a href="https://nonebot.dev/"><img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/GPT.png" width="200" height="200" alt="nonebot"></a>
</p>
<div align="center">


# GPT Terminal

<!-- prettier-ignore-start -->
<!-- markdownlint-disable-next-line MD036 -->
_✨ 定制专属于你的 GPT Terminal ✨_
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

## 预览图

<img width="1472" alt="image" src="https://github.com/ltyzzzxxx/gpt-web-terminal/assets/73587471/ddd2e43d-91c9-4d34-9ea2-e7da8f561a1c">

## 功能概览

- 支持命令行终端与 GPT 进行对话，我们程序员就是要用极客范儿的方式与 GPT 交流！

- 支持 GPT 回复内容以 Markdown 形式展现

- 基于 GPT 的中英文翻译助手，地道翻译的最佳选择！

- 基于 GPT 的命令行翻译助手，当你忘记 linux 命令时，就用它！

- 基本的终端命令，如查看历史命令、帮助手册、清屏等

- 终端用户登录与注册

## 快速开始

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

## 版本规划

- [ ] 支持自定义 GPT 角色并与当前用户绑定，真正实现定制专属于你的 GPT 机器人～
- [ ] 支持查询最近的 GPT 问答会话，使你与 GPT 的交流真正保存下来～
- [ ] 支持机器翻译，提供多种翻译选择～
- [ ] 支持用户在线设置与修改自己的 OpenAI Key，即 Key 与用户绑定～
- [x] 支持 GPT 回复内容以 Markdown 形式展现
- [x] 前端首页展示艺术字体
- [ ] 支持 GPT 回复内容 以打字机方式流式输出
- [ ] 支持前端命令行高亮展示
- [ ] 引入角色市场

各位敬请期待～

## 开源协议

Apache License Version 2.0 see http://www.apache.org/licenses/LICENSE

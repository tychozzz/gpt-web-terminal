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

## 简介

GPT Terminal 是一个让你在终端上与 GPT 进行自由对话的平台。

在这里，你可以更加轻易地实现更多定制化的功能，拥有专属于你的 GPT 终端！

项目基于 Vue3 与 Express 实现

## 预览

![gpt-terminal-demo](https://github.com/ltyzzzxxx/gpt-web-terminal/assets/73587471/dee28750-b86b-45a1-a8b2-8357b3e27a25)

## 专栏讲解（持续更新中）

> [耗时一下午，我实现了 GPT Terminal，真正拥有了专属于我的 GPT 终端！](https://juejin.cn/post/7243252896392151097)
>
> [如何用 GPT 在 5 分钟内 ”调教“ 出一个专属于你的 ”小黑子“？](https://juejin.cn/post/7244174817679573047)
> 
> [如何丝滑实现 GPT 打字机流式回复？Server-Sent Events！](https://juejin.cn/post/7244604894408933432)
> 
> [我是如何让我的 GPT Terminal “长记性” 的？还是老配方！](https://juejin.cn/post/7245812754027823160)
>
> [一个合格的类 GPT 应用需要具备什么？一文带你打通 GPT 产品功能！](https://juejin.cn/post/7246435689419604026)
> 
> [开发一个 ChatGPT 真的只是当 "接口侠" 吗？GPT Terminal 细节分享！](https://juejin.cn/post/7246917539766091837)
> 
> [如何借助于 OpenAI 以命令的方式在 GPT 终端上画一只 “坤”？](https://juejin.cn/post/7247167843498115130)

## 功能概览

- 支持命令行终端与 GPT 进行对话，我们程序员就是要用极客范儿的方式与 GPT 交流！

- 支持已登陆用户 DIY GPT 角色，并持久化。与你的专属角色进行对话！

- 支持 GPT 记忆历史对话并提供命令查询历史对话，给你的 GPT 长长记性～

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

4.   将 `server/db/gpt_terminal.sql` 导入 MySQL 数据库中

5.   运行前端

     ```bash
     npm run dev
     ```

6.   运行后端

     ```bash
     npm run start:dev
     ```

7.  快速解锁命令用法 - 命令行中使用help命令查询使用方法

    ```bash
    # 查询全部命令帮助
    help
    
    # 查询具体命令帮助
    gpt -h
    gpt chat -h
    gpt role -h
    gpt history -h
    ```

## GPT 网络与配置问题检测

通过 `GPT Demo`，检测你能否顺利请求到 `Open AI`，确保你网络通畅 且 `API Key` 可用

1. 执行如下命令，进入 `gpt-test-demo` 文件夹，并安装依赖

    ```bash
    cd gpt-test-demo && npm install
    ```

2. 在 index.js 文件中配置你的 `API Key`

    ```js
    const configuration = new Configuration({
      apiKey: "",
    });
    ```

3. 运行 index.js 文件

    ```bash
    node index.js
    ```

若顺利输出内容，则说明 `API Key` 有效且网络可访问。

<img width="1017" alt="image" src="https://github.com/ltyzzzxxx/gpt-web-terminal/assets/73587471/40703a2e-a294-40a8-bde7-52bd6882fb48">


## 如何"调教"属于你的 GPT 角色？

在执行如下步骤之前，请确保已经按照 `快速开始` 完成项目本地部署。

### v1.3.x 版本指南

> 你仍然可以采用 v1.0.x 版本指南进行角色定制，但是旧指南是定义系统默认角色，而非用户专属角色

1. 输入如下命令进行登录或注册。若未登录，需要先登录。
    
   ```bash
   # 用户登录
   user login <-u 用户名> <-p 密码>
   # 用户注册
   user register <-u 用户名> <-p 密码> <-e 邮箱>
   ```
   
2. 输入如下命令进入角色 `DIY` 流程
  
    ```bash
    # k - 角色唯一标识，例如: default / cli / sql / ikun
    # n - 角色名，例如：命令行翻译助手、SQL-BOY
    # d - 角色描述，例如：将你的自然语言指令翻译为 Window/Unix 终端命令
    gpt diy <-k GPT 角色唯一标识> <-n GPT 角色名> <-d GPT 角色描述>
    ```

示例：定义一个可以帮人看病的医生

<img width="956" alt="image" src="https://github.com/ltyzzzxxx/gpt-web-terminal/assets/73587471/d46be281-04cb-4453-b43e-c34c71e358e3">


### ~~v1.0.x 版本指南~~

后续会逐步加入前端界面中自定义角色的功能

1.   进入 `server/src/thirdpart/gptApi/template` 目录下，新建 `markdown` 文件。文件名为角色名。
     -   参照该目录下的其它模板文件
         -   SYSTEM：对 GPT 角色的定义
         -   USER - ASSISTANT：示范提示 GPT 在特定情况下该如何回答 - Prompt
2.   进入 `src/core/commands/gpt/subCommands/roles.ts` 文件中，在数组中添加你之前定义的的角色名（与 `markdown` 模板文件保持一致）。

## 版本规划

- [x] 支持自定义 GPT 角色并与当前用户绑定，真正实现定制专属于你的 GPT 机器人～
- [x] 支持 GPT 记忆历史对话，给你的 GPT 长长记性～
- [x] 支持查询最近的 GPT 问答会话，使你与 GPT 的交流真正保存下来～
- [ ] 支持用户在线设置与修改自己的 OpenAI Key
- [x] 支持 GPT 回复内容以 Markdown 形式展现
- [x] 前端首页展示艺术字体
- [x] 支持 GPT 回复内容 以打字机方式流式输出
- [ ] 支持前端命令行高亮展示
- [ ] 引入角色市场

各位敬请期待～

## 特别鸣谢

该项目灵感来源于 [YuIndex](https://github.com/liyupi/yuindex)，并最终将其改造为 「GPT Terminal」

- [@程序员鱼皮](https://github.com/liyupi)
- [@MagicCube](https://github.com/MagicCube)
- [@Overtrue](https://github.com/Overtrue)


## 开源协议

Apache License Version 2.0 see http://www.apache.org/licenses/LICENSE

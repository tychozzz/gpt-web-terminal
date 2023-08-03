<p align="center">
  <img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/GPT.png" width="200" height="200">
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

[English Doc](./README_EN.md) | [中文文档](./README_CN.md)

## 简介

GPT Terminal 是一个让你在终端上与 GPT 进行自由对话的平台。

在这里，你可以更加轻易地实现更多定制化的功能，拥有专属于你的 GPT 终端！

项目基于 Vue3 与 Express 实现

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/2S2-Da)

## 预览

演示地址：https://gpt-terminal.up.railway.app/（使用前配置 🪜）

B站功能细节展示：https://www.bilibili.com/video/BV1Ux4y1o7nu/?spm_id_from=333.999.0.0&vd_source=4e7654633e4719c03a8fb6c6b524ddc2

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
>
> [不满足当 ChatGPT “接口侠”？轻松可视化 Fine-tuning 训练你的模型！](https://juejin.cn/post/7247906556229828645)
>
> [耗时一下午，我终于上线了我的 GPT 终端！（内含详细部署方案记录）](https://juejin.cn/post/7250639505527504933)

## 功能概览

- ✨ 支持命令行终端与 GPT 进行对话，我们程序员就是要用极客范儿的方式与 GPT 交流！

- 🌟 支持 API Key（OpenAI API 方式）与 Access Token（Web API 方式）配置 - 二选一

- 🌈 支持 DIY GPT 角色，并持久化。与你的专属角色进行对话！

- ☁️ 支持 GPT 记忆历史对话并提供命令查询历史对话，给你的 GPT 长长记性～

- 🍀 支持 GPT 市面使用最广泛的 Event Stream 技术，实现打字机效果～

- 🌴 支持 GPT 回复内容以 Markdown 形式展现

- 🍃 基本的终端命令，如查看历史命令、帮助手册、清屏等

## 快速开始

你只需简单地了解如何使用 `npm` ，即可解锁全部功能！

1.   将项目克隆到本地

     ```bash
     git clone https://github.com/ltyzzzxxx/gpt-web-terminal.git
     ```

2.   进入项目目录，并分别安装前端与后端依赖

     ```bash
     cd gpt-web-terminal && npm install
     cd service && npm install
     ```

3.   在 `service/.env` 中，配置 API Key 或 Access Token

      ```
      # API Key（OpenAI API 方式） 与 Access Token（Web API 方式） 二选一
      OPENAI_API_KEY=
      OPENAI_ACCESS_TOKEN=
      # 使用 Access Token 时可配置反向代理地址
      API_REVERSE_PROXY=
      ```

4.   运行前端

     ```bash
     npm run dev
     ```

5.   运行后端

     ```bash
     npm run start
     ```

6.  快速解锁命令用法 - 命令行中使用help命令查询使用方法

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

输入如下命令进入角色 `DIY` 流程
  
```bash
# k - 角色唯一标识，例如: default / cli / sql / ikun
# n - 角色名，例如：命令行翻译助手、SQL-BOY
# d - 角色描述，例如：将你的自然语言指令翻译为 Window/Unix 终端命令
gpt diy <-k GPT 角色唯一标识> <-n GPT 角色名> <-d GPT 角色描述>
```

## 特别鸣谢

该项目灵感来源于 [YuIndex](https://github.com/liyupi/yuindex)，并最终将其改造为 「GPT Terminal」

- [@程序员鱼皮](https://github.com/liyupi)
- [@MagicCube](https://github.com/MagicCube)
- [@Overtrue](https://github.com/Overtrue)


## 开源协议

Apache License Version 2.0 see http://www.apache.org/licenses/LICENSE

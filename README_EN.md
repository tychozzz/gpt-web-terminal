<p align="center">
  <img src="https://lty-image-bed.oss-cn-shenzhen.aliyuncs.com/blog/GPT.png" width="200" height="200">
</p>
<div align="center">


# GPT Terminal

<!-- prettier-ignore-start -->
<!-- markdownlint-disable-next-line MD036 -->
_✨ Open GPT like a programmer! Customize your own GPT terminal. ✨_
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

## Introduction

GPT Terminal is a platform that allows you to have free conversations with GPT in the terminal.

Here, you can easily implement more customized functionalities and have your own GPT terminal!

The project is implemented based on Vue3 and Express.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/2S2-Da)

## Preview

Demo Link：https://gpt-terminal.up.railway.app/

![gpt-terminal-demo](https://github.com/ltyzzzxxx/gpt-web-terminal/assets/73587471/dee28750-b86b-45a1-a8b2-8357b3e27a25)

## Features

- ✨ Support dialogue between command-line terminal and GPT. As programmers, we communicate with GPT in a geeky way!

- 🌟 Support configuration of API Key (OpenAI API method) and Access Token (Web API method) - either one can be chosen.

- 🌈 Support DIY of GPT roles and persist them. Have conversations with your exclusive role!

- ☁️ Support GPT to remember the conversation history and provide commands to query the history. Give your GPT a good memory~

- 🍀 Support the widely-used Event Stream technology for GPT responses, achieving a typewriter effect~

- 🌴 Support rendering GPT responses in Markdown format.

- 🍃 Basic terminal commands such as viewing command history, accessing help manuals, clearing the screen, etc.

## Quick Start

You only need to have a basic understanding of using `npm` to unlock all the features!

1.   Clone the project to your local machine.

     ```bash
     git clone https://github.com/ltyzzzxxx/gpt-web-terminal.git
     ```

2.   Navigate to the project directory and install dependencies for the frontend and backend separately.

     ```bash
     cd gpt-web-terminal && npm install
     cd service && npm install
     ```

3.   Configure your API Key or Access Token in `service/.env`. API key takes priority.

      ```
      # Choose either API Key (OpenAI API method) or Access Token (Web API method)
      OPENAI_API_KEY=
      OPENAI_ACCESS_TOKEN=
      # Configure reverse proxy address when using Access Token
      API_REVERSE_PROXY=
      ```

4.   Run the frontend.

     ```bash
     npm run dev
     ```

5.   Run the backend.

     ```bash
     npm run start
     ```

6.  Quickly unlock command usage - use the help command in the command-line to query the usage.

    ```bash
    # Query all command help
    help

    # Query specific command help
    gpt -h
    gpt chat -h
    gpt role -h
    gpt history -h
    ```
 
## How to Design Your Own GPT Role?
   
Use the following command to start the role `DIY` process

```bash
# k - Role unique identifier, e.g., default / cli / sql / ikun
# n - Role name, e.g., Command-line Translation Assistant, SQL-BOY
# d - Role description, e.g., Translate your natural language instructions into Windows/Unix terminal commands
gpt diy <-k GPT role unique identifier> <-n GPT role name> <-d GPT role description>
```

## Special Thanks

This project was inspired by [YuIndex](https://github.com/liyupi/yuindex)，and eventually transformed it into "GPT Terminal".

- [@程序员鱼皮](https://github.com/liyupi)
- [@MagicCube](https://github.com/MagicCube)
- [@Overtrue](https://github.com/Overtrue)


## Open Source License

Apache License Version 2.0 see http://www.apache.org/licenses/LICENSE

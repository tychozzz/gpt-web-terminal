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

## Preview

Demo Link：https://gpt-web-terminal.vercel.app/#/ 

![gpt-terminal-demo](https://github.com/ltyzzzxxx/gpt-web-terminal/assets/73587471/dee28750-b86b-45a1-a8b2-8357b3e27a25)

## Function Overview

- Support dialogue between command-line terminal and GPT. As programmers, we communicate with GPT in a geeky way!

- Support logged-in users to customize their GPT roles and persist them. Have conversations with your exclusive role!

- Support GPT to remember the conversation history and provide commands to query the history. Give your GPT a good memory~

- Support the widely-used Event Stream technology for GPT responses, achieving a typewriter effect~

- Support rendering GPT responses in Markdown format.

- GPT-based Chinese-English translation assistant, the best choice for authentic translations!

- GPT-based command-line translation assistant, use it when you forget Linux commands!

- GPT-based SQL-BOY, use it when you don't know how to write SQL statements!

- Basic terminal commands such as viewing command history, accessing help manuals, clearing the screen, etc.

## Quick Start

You only need to have a basic understanding of using npm/MySQL to unlock all the features!

1.   Clone the project to your local machine

     ```bash
     git clone https://github.com/ltyzzzxxx/gpt-web-terminal.git
     ```

2.   Navigate to the project directory and install dependencies for the frontend and backend separately

     ```bash
     cd gpt-web-terminal && npm install
     cd server && npm install
     ```

3.   Modify the backend configuration. The configuration file is located at server/config/config.js.

     -   You need to change the configuration for MySQL and GPT with your own settings.

4.   Import server/db/gpt_terminal.sql into your MySQL database.

5.   Run the frontend.

     ```bash
     npm run dev
     ```

6.   Run the backend.

     ```bash
     npm run start:dev
     ```

7.  Quickly unlock command usage - use the help command in the command-line to query the usage.

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

Before proceeding with the following steps, make sure you have completed the local deployment of the project as described in `Quick Start`.

1. Use the following command to login or register. If not logged in, you need to login first.
    
   ```bash
   # User login
   user login <-u username> <-p password>
   # User registration
   user register <-u username> <-p password> <-e email>
   ```
   
2. Use the following command to start the role `DIY` process
  
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

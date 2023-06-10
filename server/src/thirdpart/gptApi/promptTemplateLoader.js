const fs = require("fs").promises;
const os = require("os");
const readline = require("readline");
const stream = require("stream");

async function loadPromptTemplate(path) {
  return new Promise(async (resolve) => {
    // 定义ChatCompletionRequestMessage数组，这就是之后需要返回的结果
    const messages = [];
    // 对当前message进行处理
    // 1. trim
    // 2. 将${OS}替换为当前操作系统·
    // 3.将其放入到messages数组中
    const saveCurrentMessage = () => {
      if (currentMessage) {
        currentMessage.content = currentMessage.content.trim();
        currentMessage.content = currentMessage.content.replace(
          "${OS}",
          os.platform()
        );
        messages.push(currentMessage);
        currentMessage = null;
      }
    };

    // 读取文件内容
    const buffer = await fs.readFile(path);
    // 创建一个可写转换流（PassThrough），它将以 'utf-8' 编码读取 buffer 中的数据，并将其返回到下一步操作中。
    const bufferStream = new stream.PassThrough({ encoding: "utf-8" });
    bufferStream.end(buffer);
    // 创建一个读取文件内容的 readline 实例对象，去读区bufferStream
    const rl = readline.createInterface({ input: bufferStream });
    let currentMessage = null;
    // 遍历文件每一行内容，
    rl.on("line", (line) => {
      // 如果行以 # 开头，则表示是新的聊天消息。这时候调用 saveCurrentMessage 函数保存之前的消息对象，并创建新的 currentMessage 对象。
      if (line.startsWith("# ")) {
        saveCurrentMessage();
        // 对象属性为role和content
        currentMessage = {
          role: line.substring(2).trim().toLowerCase(),
          content: "",
        };
      } else if (currentMessage) {
        // 如果 currentMessage 对象存在，则将当前的行内容添加到当前消息对象的内容字符串中。
        const text = line.trim();
        if (text !== "") {
          currentMessage.content += line + "\n";
        }
      }
    });
    rl.on("close", () => {
      saveCurrentMessage();
      resolve({ messages });
    });
  });
}

module.exports = {
  loadPromptTemplate,
};

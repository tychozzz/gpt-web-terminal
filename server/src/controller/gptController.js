const {
  createChatCompletion,
  generatePromptMessages,
} = require("../thirdpart/gptApi/gptApi");

const defaultRoles = ["cli", "ikun", "sql", "translator"];

/**
 * gpt请求输出接口
 * @param event
 * @param req
 * @param ress
 */
async function getGptOutput(event, req, res) {
  console.log("event - ", event);
  if (event.role === "" || event.role === "default") {
    return await createChatCompletion(event.message);
  } else if (defaultRoles.includes(event.role)) {
    // 默认角色 - 读取本地文件
    let inputMessages = await generatePromptMessages(event.role);
    return await createChatCompletion([...inputMessages, ...event.message]);
  } else {
    // 用户自定义角色 - 读取数据库
    return await createChatCompletion(event.message);
  }
}

module.exports = {
  getGptOutput,
};

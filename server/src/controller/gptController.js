const {
  createChatCompletion,
  generatePromptMessages,
  createImage,
  openaiAuth,
} = require("../thirdpart/gptApi/gptApi");

const defaultRoles = ["cli", "ikun", "sql", "translator"];

const {
  NO_AUTH_ERROR_CODE,
  SYSTEM_ERROR_CODE,
  REQUEST_PARAMS_ERROR_CODE,
} = require("../exception/errorCode");
const MyError = require("../exception");

/**
 * gpt聊天请求输出接口
 * @param event
 * @param req
 * @param ress
 */
async function getGptOutput(event, req, res) {
  console.log("event -", event);
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

async function getGptImage(event, req, res) {
  try {
    let authResp = await openaiAuth();
  } catch (e) {
    throw new MyError(NO_AUTH_ERROR_CODE, "API Key 配置不正确");
  }
  console.log("event -", event);
  if (event.prompt === "") {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "生成图像提示不能为空");
  }

  if (event.number && (event.number > 5 || event.number < 1)) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "图片数量必须为1～5之间的整数");
  }
  if (
    event.size &&
    event.size != "256x256" &&
    event.size != "512x512" &&
    event.size != "1024x1024"
  ) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, "生成图像尺寸格式错误");
  }
  return await createImage(
    event.prompt,
    event.number || 1,
    event.size || "256x256"
  );
}

module.exports = {
  getGptOutput,
  getGptImage,
};

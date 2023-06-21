const { loadPromptTemplate } = require("./promptTemplateLoader");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const { gptConfig } = require("../../config/getConfig");

const configuration = new Configuration({
  apiKey: gptConfig.key,
});
const openai = new OpenAIApi(configuration);

// role - template 缓存
const roleMap = {};

// 渲染角色模板
async function generatePromptMessages(role) {
  // 直接从缓存读取
  if (roleMap[role]) {
    let res = Object.assign(roleMap[role]);
    console.log("命中 roleMap 缓存");
    return res;
  }
  let template = await loadPromptTemplate(
    path.resolve(__dirname, `./template/${role}.md`)
  );
  console.log("template是：", template);
  // 写入缓存
  roleMap[role] = template.messages;
  console.log("未命中 roleMap 缓存");
  return template.messages;
}

// API Key 验证
async function openaiAuth() {
  return await openai.listModels();
}

// 获取 GPT 输出
async function createChatCompletion(messages) {
  console.log("inputMessages", messages);
  // 如下为 流式数据传输 写法
  const res = await openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    },
    {
      responseType: "stream",
    }
  );
  return res;

  // 如下为 非流式数据传输 写法
  // const response = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   temperature: 0,
  //   messages,
  // });
  // if (response.data.choices.length) {
  //   const firstMessage = response.data.choices[0].message;
  //   if (firstMessage) {
  //     console.log("回复内容：", firstMessage.content);
  //     return firstMessage.content;
  //   }
  // }
  // throw new Error("Failed to get response from OpenAI service.");
}

// 获取 GPT 生成的 Image
async function createImage(prompt, number = 1, size = "256x256") {
  const res = await openai.createImage({
    prompt: prompt,
    n: number,
    size: size,
  });
  console.log(res.data.data);
  if (res?.data?.data && res?.data?.data?.length) {
    return res.data.data;
  }
  throw new Error("Failed to get response from OpenAI service.");
}

module.exports = {
  openaiAuth,
  generatePromptMessages,
  createChatCompletion,
  createImage,
};

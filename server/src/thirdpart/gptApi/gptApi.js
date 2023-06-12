const { loadPromptTemplate } = require("./promptTemplateLoader");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const { gptConfig } = require("../../config/getConfig");

const configuration = new Configuration({
  apiKey: gptConfig.key,
});
const openai = new OpenAIApi(configuration);

async function generatePromptMessages(input, role) {
  let template = await loadPromptTemplate(
    path.resolve(__dirname, `./template/${role}.md`)
  );
  console.log("template是：", template);
  return [
    ...template.messages,
    {
      role: "user",
      content: input,
    },
  ];
}

async function createChatCompletion(messages) {
  // 如下为 流式数据传输 写法
  const res = openai.createChatCompletion(
    {
      model: "gpt-3.5-turbo",
      messages,
      stream: true,
    },
    {
      responseType: "stream",
    }
  );
  return res

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

module.exports = {
  generatePromptMessages,
  createChatCompletion,
};

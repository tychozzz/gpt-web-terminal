const {
  createChatCompletion,
  generatePromptMessages,
} = require("../thirdpart/gptApi/gptApi");

/**
 * gpt请求输出接口
 * @param event
 * @param req
 * @param ress
 */
async function getGptOutput(event, req, res) {
  console.log("event - ", event);
  if (event.role === "" || event.role === "default") {
    return await createChatCompletion([
      {
        role: "user",
        content: event.message,
      },
    ]);
  } else {
    const inputMessages = await generatePromptMessages(
      event.message,
      event.role
    );
    return await createChatCompletion(inputMessages);
  }
}

module.exports = {
  getGptOutput,
};

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

async function createChatCompletion(messages) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
  if (response.data.choices.length) {
    const firstMessage = response.data.choices[0].message;
    if (firstMessage) {
      return firstMessage.content;
    }
  }
  throw new Error("Failed to get response from OpenAI service.");
}

createChatCompletion([{ role: "user", content: "Hello world" }])
  .then(result => {
    console.log("result:", result);
  })
  .catch(error => {
    console.error(error);
  });

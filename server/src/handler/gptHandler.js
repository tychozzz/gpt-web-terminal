const { openaiAuth } = require("../thirdpart/gptApi/gptApi");

async function handleStream(res, req, handlerFunction) {
  try {
    let authResp = await openaiAuth();
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    const resp = await handlerFunction(req.body, req, res);
    resp.data.on("data", (data) => {
      console.log("stream data -", data.toString());
      const lines = data
        .toString()
        .split("\n\n")
        .filter((line) => line.trim() !== "");
      for (const line of lines) {
        const message = line.replace("data: ", "");
        if (message === "[DONE]") {
          res.end();
          return;
        }
        const parsed = JSON.parse(message);
        console.log("parsed content -", parsed.choices[0].delta.content);
        res.write(`${parsed.choices[0].delta.content}`);
      }
    });
    resp.data.on("error", (error) => {
      console.log("resp error:", error.message);
      // res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ code: 500, data: null, message: error.message })
      );
    });
  } catch (e) {
    console.log("out error:", e.message);
    if (e.message === 'Request failed with status code 429') {
      res.write("使用频繁，请稍后重试～")
      res.end()
      return
    }
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ code: 401, data: null, message: null }));
  }
}

module.exports = {
  handleStream,
};

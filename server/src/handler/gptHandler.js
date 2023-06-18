const { openaiAuth } = require("../thirdpart/gptApi/gptApi");

async function handleStream(res, req, handlerFunction) {
  try {
    let authResp = await openaiAuth();
    console.log(authResp);
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
      console.log("error:", error.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ code: 500, data: null, message: error.message })
      );
    });
  } catch (e) {
    console.log("error:", e.message);
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ code: 401, data: null, message: null }));
  }
}

module.exports = {
  handleStream,
};

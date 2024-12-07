const express = require("express");
const request = require("request");
const app = express();

app.get("/proxy", (req, res) => {
  const targetUrl = req.query.url;
  request(
    { url: targetUrl, headers: { "User-Agent": "Mozilla/5.0" } },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.set("Content-Type", response.headers["content-type"]);
        res.send(body.replace(/X-Frame-Options: .*?\n/, ""));
      } else {
        res.status(500).send("Failed to fetch content.");
      }
    }
  );
});

app.listen(3001, () => console.log("Proxy server running on port 3001"));
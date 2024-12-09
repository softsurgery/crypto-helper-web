const express = require("express");
const request = require("request");
const { JSDOM } = require("jsdom");

const app = express();

app.get("/proxy", (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("URL query parameter is required.");
  }

  request(
    { url: targetUrl, headers: { "User-Agent": "Mozilla/5.0" } },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        console.error("Failed to fetch the content:", error || response.statusCode);
        return res.status(500).send("Failed to fetch content.");
      }

      // Check if the content is HTML
      const contentType = response.headers["content-type"] || "";
      if (!contentType.includes("text/html")) {
        return res.status(400).send("The provided URL does not return HTML content.");
      }

      // Use JSDOM to parse and modify the HTML content
      const dom = new JSDOM(body, { runScripts: "dangerously" });
      const { document } = dom.window;

      // Inject a script to dynamically remove the element
      const script = document.createElement("script");
      script.textContent = `
        const observer = new MutationObserver(() => {
          let unwantedElement = document.querySelector(".sc-f9c982a5-0.kLLhae");
          if (unwantedElement) {
            unwantedElement.remove();
            console.log("Unwanted element removed dynamically!");
          }
          unwantedElement = document.querySelector(".sc-bce5490-0 eSRtrR");
          if (unwantedElement) {
            unwantedElement.remove();
            console.log("Unwanted element removed dynamically!");
          }
          unwantedElement = document.querySelector(".sc-bce5490-0 Vvqsb");
          if (unwantedElement) {
            unwantedElement.remove();
            console.log("Unwanted element removed dynamically!");
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      `;
      document.body.appendChild(script);

      // Send the modified HTML back
      res.set("Content-Type", contentType);
      res.send(dom.serialize());
    }
  );
});

app.listen(3001, () => console.log("Proxy server running on port 3001"));

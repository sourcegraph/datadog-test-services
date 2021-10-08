const tracer = require("dd-trace").init();

const express = require("express");
const app = express();

const http = require("http");

app.get("/", (req, res) => {
  tracer.trace("pong", () => {
    res.send("pong");
  });
});

app.listen(3001, () => {
  console.log("datadog service node 2 listening at http://localhost:3001");
});

// Make requests to sibling service
setInterval(() => {
  http.get(
    { hostname: "localhost", port: 3000, method: "GET", path: "/" },
    (res) => {
      let str = "";
      res.on("data", (chunk) => {
        str += chunk;
      });

      res.on("end", () => {
        console.log(str);
      });
    }
  );
}, 5000);

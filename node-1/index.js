const tracer = require("dd-trace").init({
  "env": "dev-1"
});

const express = require("express");
const app = express();

const http = require("http");

app.get("/", (req, res) => {
  tracer.trace("ping", () => {
    res.send("ping");
  });
});

app.listen(3000, () => {
  console.log("datadog service node 1 listening at http://localhost:3000");
});

// Make requests to sibling service
setInterval(() => {
  http.get(
    { hostname: "localhost", port: 3001, method: "GET", path: "/" },
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
}, 10000);

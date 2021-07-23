const tracer = require("dd-trace").init({
  service: "sg-test-node-1",
  env: "prod",
});

const express = require("express");
const app = express();

const http = require("http");

app.get("/", (req, res) => {
  tracer.trace("home", () => {
    res.send("hello world");
  });
});

app.get("/call-2", async (req, res) => {
  http.get(
    { hostname: "localhost", port: 3001, method: "GET", path: "/receive-1" },
    (res2) => {
      let str = "";
      res2.on("data", (chunk) => {
        str += chunk;
      });

      res2.on("end", () => {
        res.send(str);
      });
    }
  );
});

app.listen(3000, () => {
  console.log("datadog service node 1 listening at http://localhost:3000");
});

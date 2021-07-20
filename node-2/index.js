const tracer = require("dd-trace").init({
  service: "sg-test-node-2",
  env: "prod",
});

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  tracer.trace("home", () => {
    res.send("hello world");
  });
});

app.get("/receive-1", (req, res) => {
  res.send("hello from 2");
});

app.listen(3001, () => {
  console.log("datadog service node 2 listening at http://localhost:3001");
});

const tracer = require("dd-trace").init({
  service: "sg-test-node-1",
  env: "prod",
});

/**
 * command to set up agent:
 *
 * docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<OUR_API_KEY> -e DD_SITE="datadoghq.com" -e DD_APM_ENABLED=true -p 8126:8126/tcp gcr.io/datadoghq/agent:7
 *
 * Basically, make sure to add:
 * -e DD_APM_ENABLED=true
 * -p 8126:8126/tcp
 */

const express = require("express");
const app = express();

const axios = require("axios");

app.get("/", (req, res) => {
  tracer.trace("home", () => {
    res.send("hello world");
  });
});

app.get("/call-2", async (req, res) => {
  await axios.get("http://localhost:3001/receive-1");
  res.send("called service 2");
});

app.listen(3000, () => {
  console.log("datadog service node 1 listening at http://localhost:3000");
});

# Datadog Service Map Sourcegraph extension test services


Grab the DATADOG_API_KEY from the datadog [website](https://app.datadoghq.com/organization-settings/api-keys)

Run:
```
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=datadoghq.com \
              gcr.io/datadoghq/agent:latest
```

Once the reporting agent is up, run the following two services:
```
node node-1/index.js
node node-2/index.js
```

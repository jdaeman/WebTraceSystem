# How to use

1. git clone https://github.com/jdaeman/WebTraceSystem
1. change to release branch
1. cd WebTraceSystem
1. **fix vm.max_map_count**
    - wsl
        1. wsl -d docker-desktop
        1. sysctl -w vm.max_map_count=262144
    - linux
        1. grep vm.max_map_count /etc/sysctl.conf
        1. vm.max_map_count=262144
        1. sysctl -w vm.max_map_count=262144
1. cd system
1. fix .env file contents
1. build image
  - docker build . -f docker/Dockerfile -t mybroker:0.1
1. docker compose up
1. check kibana access
    - 127.0.0.1:5601
1. kibana dev tools
1. run query
~~~
PUT es7-weblog2
{
  "mappings": {
    "properties": {
      "host_address": {
        "type": "ip"
      },
      "location": {
        "type": "geo_point"
      }
    }
  }
}
~~~
---
## Step2
1. cd ../server
1. **go mod tidy**
1. go build
1. run "Build output"
1. install chrome extension

---
## etc
1. how to modify target index name
  - edit config/logstash/logstash-core.conf
  - output=> elasticsearch => **index**
  - ann then, make index at kibana 

---
## some errors
1. elasticsearch jvm options
1. volume permissions

# How to use

1. git clone https://github.com/jdaeman/WebTraceSystem
1. change to release branch
1. cd WebTraceSystem
1. fix vm.max_map_count
    - wsl
        1. wsl -d docker-desktop
        1. sysctl -w vm.max_map_count=262144
    - linux
        1. grep vm.max_map_count /etc/sysctl.conf
        1. vm.max_map_count=262144
        1. sysctl -w vm.max_map_count=262144
1. cd system 
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
  1. how to modify index name
    - edit system/config/logstash/logstash-core.conf
1. cd ../server
1. go mod tidy
1. go run main.go
    - or go build & execute program
1. install chrome extension

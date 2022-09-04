package main

import (
	"engine"
)

func parseConfig() {

}

func main() {
	config := engine.ServerConfig{}
	config.Port = 8080
	config.KafkaConf = engine.KafkaConfig{Host: "127.0.0.1:29092", Topic: "my-log"}
	engine.RunServer(config)
}

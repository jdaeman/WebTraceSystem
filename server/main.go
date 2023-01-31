package main

import (
	"engine"
	"fmt"
	"os"
)

func parseConfig() {

}

func main() {
	kafkaHost := "localhost:9092"
	if len(os.Args) > 1 {
		if os.Args[1] == "--help" {
			fmt.Println("Run with argument => kafkahost:port")
			os.Exit(0)
		} else {
			kafkaHost = os.Args[1]
		}
	}
	config := engine.ServerConfig{}
	config.Port = 8080
	config.KafkaConf = engine.KafkaConfig{Host: kafkaHost, Topic: "my-log"}
	engine.RunServer(config)
}

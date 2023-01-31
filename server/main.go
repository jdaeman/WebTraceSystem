package main

import (
	"engine"
	"fmt"
	"os"
)

func parseConfig() {

}

func main() {
	if len(os.Args) > 1 {
		if os.Args[1] == "--help" {
			fmt.Println("help message")
			os.Exit(0)
		}
	}
	config := engine.ServerConfig{}
	config.Port = 8080
	config.KafkaConf = engine.KafkaConfig{Host: "127.0.0.1:29092", Topic: "my-log"}
	engine.RunServer(config)
}

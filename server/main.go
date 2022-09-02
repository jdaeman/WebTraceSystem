package main

import (
	"engine"
)

func parseConfig() {

}

func main() {
	config := engine.ServerConfig{}
	config.Port = 8080
	engine.RunServer(config)
}

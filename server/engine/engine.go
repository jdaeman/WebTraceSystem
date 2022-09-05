package engine

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

var channel chan interface{}

func init() {
	// make channel for
	// 1. server setting check
	// 2. send message to kafka
	channel = make(chan interface{}, 3)
}

func setHostAddress(obj *WebLogData) bool {
	domains := strings.Split(obj.Url, "/")

	if len(domains) < 3 {
		log.Println("Invalid domain", obj.Url)
		return false
	}

	ips, err := net.LookupIP(domains[2])
	if err != nil {
		log.Println("Lookup fail", err)
		return false
	}
	if len(ips) < 1 {
		log.Println("IP count zero")
		return false
	}

	obj.HostAddress = ips[0].String()
	return true
}

// func toKafka() {
// 	log.Println("Start log processor")

// 	for {
// 		data := <-channel
// 		if data == nil {
// 			log.Println("Stop channel")
// 			break
// 		}

// 		obj := data.(WebLogData)
// 		ok := setHostAddress(&obj)

// 		if !ok {
// 			continue
// 		}

// 		log.Println(obj)
// 	}

// 	log.Println("Stop log processor")
// 	close(channel)
// }

func respHelthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func recvWebLog(c *gin.Context) {
	jsonData, _ := ioutil.ReadAll(c.Request.Body)
	webLog := WebLogData{}
	err := json.Unmarshal(jsonData, &webLog)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		
		userAgent := c.GetHeader("User-Agent")
		webLog.UserAgent = userAgent

		log.Println("json Unmarshal error", err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "clear",
	})

	channel <- webLog
}

func RunServer(config ServerConfig) {
	bindAddress := fmt.Sprint("0.0.0.0:", config.Port)

	//go toKafka()
	go StartKafkaHandler(config.KafkaConf, &channel)
	{
		resourceCheck := <-channel
		if resourceCheck != nil {
			log.Println("Kafka check fail")
			return
		}
	}

	log.Println("Kaka check success")

	r := gin.Default()
	r.GET("/ping", respHelthCheck)
	r.POST("/push", recvWebLog)

	r.Run(bindAddress)

	channel <- nil
}

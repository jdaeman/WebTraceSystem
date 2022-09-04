package engine_test

import (
	"engine"
	"fmt"
	"log"
	"testing"

	"github.com/segmentio/kafka-go"
)

func TestKafkaProduce(t *testing.T) {
	config := engine.KafkaConfig{Host: "localhost:29092", Topic: "my-topic1"}
	engine.InitKafka(config)

	err := engine.ProduceMessage([]byte("Hello World, this is test message!"))
	if err != nil {
		log.Println("Kafka produce Error", err)
		t.FailNow()
	}

	log.Println("Success")
}

func TestKafkaHealthCheck(t *testing.T) {
	conn, err := kafka.Dial("tcp", "localhost:29092")
	if err != nil {
		log.Println("error1", err)
		t.FailNow()
	}
	defer conn.Close()

	partitions, err := conn.ReadPartitions()
	if err != nil {
		log.Println("error2", err)
		t.FailNow()
	}

	m := make(map[string]string)

	for _, p := range partitions {
		m[p.Topic] = p.Isr[0].Host
	}
	for k, v := range m {
		fmt.Println(k, " == ", v)
	}
}

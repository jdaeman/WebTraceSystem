package engine

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/segmentio/kafka-go"
)

type KafkaConfig struct {
	Host  string
	Topic string
}

var kafka_writer *kafka.Writer

func InitKafka(config KafkaConfig) {
	kafka_writer = &kafka.Writer{
		Addr:     kafka.TCP(config.Host),
		Topic:    config.Topic,
		Balancer: &kafka.LeastBytes{},
	}
}

func ProduceMessage(buf []byte) error {
	err := kafka_writer.WriteMessages(context.Background(),
		kafka.Message{
			Value: buf,
		},
	)
	if err != nil {
		return err
	}
	return nil
}

func healthCheck(host string) error {
	conn, err := kafka.Dial("tcp", host)
	if err != nil {
		return err
	}
	defer conn.Close()

	partitions, err := conn.ReadPartitions()
	if err != nil {
		return err
	}

	m := make(map[string]bool)
	for _, p := range partitions {
		m[p.Topic] = true
	}

	log.Println("Kafka topic list...")
	for k := range m {
		fmt.Println(k)
	}

	return nil
}

func StartKafkaHandler(config KafkaConfig, channel *chan interface{}) {
	err := healthCheck(config.Host)
	if err != nil {
		*channel <- err

		log.Println("Kafka handler teriminated by error")
		return
	} else {
		*channel <- nil
	}

	InitKafka(config)

	for {
		data := <-*channel
		if data == nil {
			log.Println("Stop channel")
			break
		}

		obj := data.(WebLogData)
		ok := setHostAddress(&obj)

		if !ok {
			continue
		}

		buf, err := json.Marshal(obj)
		if err != nil {
			log.Println("json marshal error", err)
			continue
		}

		err = ProduceMessage(buf)
		if err != nil {
			log.Println("Fail message produce", err)
			continue
		}
	}

}

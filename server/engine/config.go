package engine

type ServerConfig struct {
	Port     int
	CpuCount int

	KafkaConf KafkaConfig
}

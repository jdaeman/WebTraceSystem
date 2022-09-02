package engine

type WebLogData struct {
	Timestamp   string `json:"timestamp"`
	Url         string `json:"url"`
	TabId       int    `json:"tab_id"`
	RequestId   int    `json:"request_id"`
	HostAddress string `json:"host_address"`
}

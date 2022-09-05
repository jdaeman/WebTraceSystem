package engine

type WebLogData struct {
	// by client
	Timestamp   string `json:"timestamp"`
	Url         string `json:"url"`
	TabId       int    `json:"tab_id"`
	RequestId   int    `json:"request_id"`
	// by server
	HostAddress string `json:"host_address"`
	UserAgent   string `json:"user_agent"`
}

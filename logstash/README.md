# logstash

## input
1. kafka
    - bootstrap_servers
    - topics
    - group_id
        - ~~group 은 먼저 만들어야 함~~
        - group 이 없어도, auto_offset_rest => "earliest" 로 하면 group 을 생성함 / topic 역시.
    - auto_offset_reset
        - earliest: offset 을 가장 빠른 offset 으로 자동 재설정
        - latest: offset 을 가장 최신 offset 으로 자동 재설정
        - none: 해당 consumer group이 가져가고자 하는 topic의 consuer offset정보가 없으면 exception을 발생시킴

---
## filter
1. json
    - source => "message"
        - input 의 message 를 파싱해서 object 로 만듬.

---
## 실행
- --path.settings
    - config 디렉터리 명시
- -f 
    - .conf 파일 경로 명시
- --config.reload.automatic
    - .conf 파일 수정 시, conf 를 다시 로딩

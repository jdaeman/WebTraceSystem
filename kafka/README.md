# kafka

## zookeeper 설정
1. config/zookeeper.properties
    - dataDir

---
## kafka 설정
1. config/server.properties
    - log.dirs

---
## 실행
1. zookeeper 실행
1. kafka 실행
- exmaple
    - bin/zookeeper-server-start.sh -daemon config/zookeeper.properties
    - bin/kafka-server-start.sh -daemon config/server.properites

---
## 종료
1. kafka 종료
1. zookeeper 종료
- example
    - bin/kafka-server-stop.sh config/server.properites
    - bin/zookeeper-server-stop.sh config/zookeeper.properties

---
## topic 관리를 위한 명령어
1. topic 생성
    - bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic mytest
        - replication_factor
        - paritions
1. topic 조회
    - bin/kafka-topics.sh --list --bootstrap-server localhost:9092
        - kafka 에 저장된 모든 topic 을 확인
    - bin/kafka-topics.sh --describe --bootstrap-server localhost:9092 --topic mytest
        - 특정 topic 만 확인

---
## producer 관련 명령어
1. message 생성
    - bin/kafka-console-producer.sh --bootstrap-server localhost:9092 --topic mytest
        - 메시지 입력 후 엔터...

---
## consumer 관련 명령어
1. message consume
    - bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 **--from-beginning** --topic mytest
        - 해당 topic 의 첫번째 메시지 부터
    - bin/kafka-console-consumer.sh --topic mytest --bootstrap-server localhost:9092 --from-beginning **--group test3group**
        - 특정 group 에 속해서 메시지를 소비
        - 명시한 group 이 없으면 새로 만들고, 있으면 마지막 offset 이후 부터 소비

---
## consumer group 관련 명령어
1. group 생성
    - bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic mytest --group othergroup
1. group 조회
    - bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
    - bin/kafka-consumer-groups.sh --describe --bootstrap-server localhost:9092 --group test3group
1. offset reset
    - bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group test3group --topic mytest --reset-offsets --to-earliest --execute

---
## docker
- ubuntu image 에 kafka download 후 container 를 생성하면, 
- host 머신에서 접속 하기 어려워보임
    - listeners
        - kafka broker 가 내부적으로 바인딩 하는 주소
        - zookeeper 가 kafka broker 를 관리한다.
    - advertised.listeners
        - kafka producer, consumer 에게 노출할 주소
    - host 머신에서 container에 ip 로 접속할 수 없기 때문 인듯.
- **docker hub 에서 image 를 pull 해서 사용하는 편이 좋다.**
    - https://hub.docker.com/r/confluentinc/cp-kafka
- mount 
    - /var/lib/zookeeper/data
    - /var/lib/zookeeper/log
    - /var/lib/kafka/data
---
## 기타
- Command must include exactly one action: --list, --describe, --delete, --reset-offsets, --delete-offsets

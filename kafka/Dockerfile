FROM ubuntu:20.04 as builder
LABEL version="0.1.0"
LABEL description="Simple kafka"

RUN sed -i "s/archive.ubuntu.com/mirror.kakao.com/g" /etc/apt/sources.list && \
    apt-get update && apt-get install -y wget openjdk-8-jre

RUN mkdir /download && cd /download && \
    wget -q https://archive.apache.org/dist/kafka/3.2.0/kafka_2.13-3.2.0.tgz && \
    tar -zxf kafka_2.13-3.2.0.tgz && mv kafka_2.13-3.2.0 /kafka && \
    cd / && rm -rf /download

CMD /kafka/bin/zookeeper-server-start.sh -daemon /kafka/config/zookeeper.properties && \
    /kafka/bin/kafka-server-start.sh /kafka/config/server.properties

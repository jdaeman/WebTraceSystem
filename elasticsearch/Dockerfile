FROM elasticsearch:7.16.2 as builder
LABEL version="0.1.0"
LABEL description="Simple elasticsearch"

COPY config/* /usr/share/elasticsearch/config

WORKDIR /usr/share/elasticsearch

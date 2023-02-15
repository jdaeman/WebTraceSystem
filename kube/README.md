# execution order
1. kafka
1. kakfa-service
1. sysctl -w vm.max_map_count=262144
1. elastic-service
1. elastic-cluster
1. kibana
1. logstash
1. broker

# manual
- kubectl create configmap ...
    - ref) logstash.yml
- kubectl apply -f kafka.yml
- kubectl apply -f kafka-service.yml
- only windows
    - wsl -d wsl -d docker-desktop
    - sysctl -w vm.max_map_count=262144
- kubectl apply -f elastic-service.yml
- kubectl apply -f elastic-cluster.yml
- kubectl apply -f kibana.yml
    - kubectl port-forward kibana 5601
- create index
- kubectl apply -f logstash.yml
    - wait...
- kubectl apply -f broker.yml


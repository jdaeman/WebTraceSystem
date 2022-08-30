# elasticsearch docker cluster setting

## docker network
1. docker network ls
1. docker network create
    - docker network create -d=bridge --subnet=172.168.10.0/24 --ip-range=172.168.10.0/24 --gateway=172.168.10.1 mynetwork
1. docker network inspect
    - docker network inspect mynetwork

---
## docker image
1. docker pull elasticsearch:7.16.2
1. 단순 실행 시 bootstrap 체크 실패
    - max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
        - wsl2 에서
            - wsl -d docker-desktop
            - sysctl -w vm.max_map_count=262144
        - linux 에서
            - grep vm.max_map_count /etc/sysctl.conf
            - vm.max_map_count=262144
            - sysctl -w vm.max_map_count=262144
    - the default discovery settings are unsuitable for production use; at least one of [discovery.seed_hosts, discovery.seed_providers, cluster.initial_master_nodes] must be configured
        - 설정 파일 필요
        - discovery.seed_hosts 와 cluster.initial_master_nodes 가 중요

---
## elasticsearch.yml
환경 변수로 설정파일을 작성할 수 있다.
1. cluster.name
    - my-cluster
1. node.name
    - ${NODENAME1}
1. network.host
    - 0.0.0.0
1. discovery.seed_hosts
    - ["eshost1", "eshost2", "eshost3"]
1. cluster.initial_master_nodes
    - ["\${NODENAME1}", "\${NODENAME2}", "\${NODENAME3}"]

---
## Dockerfile
- e

---
## container 실행
- docker run -it --rm -p 9200:9200 --network mynetwork --add-host eshost1:172.168.10.2 --add-host eshost2:172.168.10.3 --add-host eshost3:172.168.10.4 --ip=172.168.10.2 -e NODENAME=esnode1 -u elasticsearch es
- docker run -it --rm --network mynetwork --add-host eshost1:172.168.10.2 --add-host eshost2:172.168.10.3 --add-host eshost3:172.168.10.4 --ip=172.168.10.3 -e NODENAME=esnode2 -u elasticsearch es
- docker run -it --rm --network mynetwork --add-host eshost1:172.168.10.2 --add-host eshost2:172.168.10.3 --add-host eshost3:172.168.10.4 --ip=172.168.10.4 -e NODENAME=esnode3 -u elasticsearch es
- 확인
    - localhost:9200/_cat/nodes?pretty=true

# Docker compose

## install for linux
1. wget -q -O docker-compose https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-linux-x86_64
1. chmod u+x docker-compose
1. mv docker-compose /usr/local/bin
1. docker-compose --version

---
## network
- docker network 로 만든 network 를 compose 에서 사용할 순 없다.
- docker-compose.yml 에서 별도로 만들어야 한다.

---
## depends_on
- 어느 서비스가 먼저 시작하고 중단 할지 그 순서를 정한다.
    - stack 같은 방식으로 시작하고 종료 함
- 단, 서비스가 ready 되기까지 결정하지는 않는다.
    - 선행 서비스 컨테이너가 먼저 실행되지만, 해당 서비스가 아직 실행되지 않을 수 있다.

---
## links
- 네트워크 상에서 컨테이너의 통신을 다룬다.

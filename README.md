## การ run development environment

`docker compose -f dev-docker-compose.yml up --build`

## การ down

`docker compose -f dev-docker-compose.yml down`

## การ run production

- run คำสั่ง `docker compose up --build`


## SET Environment For Run UI Automate Test Use Jenkin
1. Check Python 3 have installed
- python3 --version

1.1 If you are using Ubuntu 16.10 or newer, then you can easily install Python 3 with the following commands: 
- apt-get update
- apt install software-properties-common
- add-apt-repository ppa:deadsnakes/ppa
- apt update
- apt install python3.9 -y

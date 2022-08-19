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
- apt install python3-pip
- apt-get install wget
- wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
- sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
- apt-get update
- apt-get install google-chrome-stable
- google-chrome --version
- pip3 install robotframework
- pip3 install robotframework-seleniumlibrary
- pip3 install webdrivermanager
- webdrivermanager chrome --linkpath /usr/local/bin
- chromedriver

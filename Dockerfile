FROM nginx:1.23.1-alpine

# ปรับ environment ใน alpine
RUN apk update && apk upgrade

# 1. ติดตั้ง node@16
RUN apk add --update nodejs==16.16.0-r0 npm

# 2. ติดตั้ง @angular/cli@13
RUN npm install -g @angular/cli@13

# 3. คัดลอก source-code ไปที่ /source-code/frontend-parking
RUN mkdir /source-code/
RUN mkdir /source-code/frontend-parking
COPY . /source-code/frontend-parking

# 4. ng build
WORKDIR /source-code/frontend-parking
RUN npm install
RUN ng build --output-path=/usr/share/nginx/html

# ปรับ nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


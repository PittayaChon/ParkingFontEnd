FROM nginx:1.23.1-alpine

# update && upgrade alpine linux ให้เป็นเวอร์ชั่นล่าสุด
RUN apk update && apk upgrade

# ติดตั้งสิ่งที่จำเป็นต่อการ build Angular proj
# 1. ติดตั้ง node@16
RUN apk add --update nodejs==16.16.0-r0 npm

# 2. ติดตั้ง @angular/cli@13
RUN npm install -g @angular/cli@13

# 3. คัดลอก Angular proj ไปที่ /source-code/frontend-parking
RUN mkdir -p /source-code/frontend-parking
COPY . /source-code/frontend-parking

# 4. Build Angular ไปยัง /usr/share/nginx/html เพื่อให้ nginx สามารถเข้าถึงได้
WORKDIR /source-code/frontend-parking
RUN npm install
RUN ng build --output-path=/usr/share/nginx/html

# คัดลอกไฟล์ nginx.conf ไปยัง container
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
### STAGE 1: Build ###
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:prod

### STAGE 2: Run ###
FROM nginx:1.18.0-alpine
RUN rm -rf /usr/share/nginx/html/*
RUN apk update && apk add openssl
RUN openssl req -x509 -nodes -days 365 -subj "/C=SV/ST=SS/O=AlfredoVasquez, Inc./CN=localhost" -addext "subjectAltName=DNS:localhost" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/marvel-frontend /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
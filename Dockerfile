### STAGE 1: Build ###
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:prod
### STAGE 2: Run ###
FROM nginx:1.18.0-alpine
COPY --from=build /usr/src/app/dist/marvel-frontend /usr/share/nginx/html
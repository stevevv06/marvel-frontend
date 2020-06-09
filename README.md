# MARVEL FRONTEND ANGULAR APP TECHNICAL CHALLENGE APPLICATION

This application consumes Marvel's public Rest Api [Marvel API](https://developer.marvel.com/documentation/getting_started)
Implemented with Angular 9 and Material Angular 9 with WPA capabilities.
A docker confiuration it's provided for production environment with nginx and https configuration



## Running with docker


### Prerequisites
1.Install docker and docker compose

[Docker Engine](https://docs.docker.com/engine/install/)

[Docker Compose](https://docs.docker.com/compose/install/)


### Running the application
In order to run the application execute the command:

    docker-compose up -d

Once container is up Navigate to `https://localhost:8089/`. Certificate it's self signed so you may need to add it to trusted in browser
    

## Running  from sources

### Prerequsites
Before running the application, you must install
1. NodeJs: install node js (lts 12.18.0) https://nodejs.org/en/download/

2. Angular CLI: run the command
    npm install -g @angular/cli


### Run application
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
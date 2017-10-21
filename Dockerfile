FROM arm32v6/alpine
MAINTAINER universehan

RUN apk --update add nodejs nodejs-npm

COPY . ~/canvas/

WORKDIR ~/canvas

RUN npm install

CMD node game.server.js

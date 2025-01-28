FROM node:22-alpine

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
COPY ./build/index.js /usr/src/app/index.js

RUN npm i --production
RUN apk add --no-cache curl

EXPOSE 5000

CMD ["node", "index.js"]
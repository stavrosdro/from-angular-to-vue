FROM node:14-alpine

RUN npm install -g @vue/cli

USER node

WORKDIR /app

EXPOSE 8080

CMD npm install && npm run serve

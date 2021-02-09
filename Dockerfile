FROM node:alpine

WORKDIR /usr/bot

COPY . .

RUN yarn

CMD ["yarn", "start"]
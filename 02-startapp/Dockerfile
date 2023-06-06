FROM node:alpine

WORKDIR /usr/startapp

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]
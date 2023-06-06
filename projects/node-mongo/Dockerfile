FROM node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install 

COPY ./ ./

ENV MONGO_HOST "mongo"
ENV REDIS_HOST "redis"

EXPOSE 3000

CMD ["npm", "run", "dev"]

